import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Checkbox,
  CheckboxLabel,
  CheckboxWrapper,
  ErrorText,
  HiddenCheckbox,
  Input,
  InputWrapper,
  LoginButton,
} from './commonStyle';
import { useMutation } from '@tanstack/react-query';
import { authAPI, LoginFormType } from '../../../apis/Auth';
import { useNotificationStore } from '../../../hooks/notificationStore';

const Login = () => {
  const nav = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    phone: '',
    password: '',
    rememberPhone: false,
  });
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

  //로그인이 되어있으면 이동
  useEffect(() => {
    if (authAPI.checkAuth()) {
      nav('/manage/map');
    }
  }, [nav]);

  //아이디 저장이 되어있는 경우
  useEffect(() => {
    const remembered = authAPI.getRememberedPhone();
    setLoginForm((prev) => ({
      ...prev,
      phone: remembered.phone,
      rememberPhone: remembered.checked,
    }));
  }, []);

  // 알림함수 구현
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  const joinMutation = useMutation({
    mutationFn: (data: LoginFormType) => authAPI.login(data),
    onSuccess: () => {
      showNotification('로그인 성공!', { severity: 'success' });

      // 아이디 저장이 체크되어 있으면 전화번호는 유지
      const shouldRememberPhone = loginForm.rememberPhone;
      setLoginForm({
        phone: shouldRememberPhone ? loginForm.phone : '',
        password: '',
        rememberPhone: shouldRememberPhone,
      });

      nav('/manage/map');
    },
    onError: (error: any) => {
      const errorMes =
        error.response?.data?.message ||
        '로그인에 실패했습니다. 다시 시도해주세요.';
      showNotification(errorMes, {
        severity: 'error',
        autoHideDuration: 6000,
      });
    },
  });

  const onSubmit = () => {
    const isFormFilled = Object.values(loginForm).every(
      (value) => value !== ''
    );
    if (isFormFilled) {
      joinMutation.mutate(loginForm);
    } else {
      showNotification('빈칸 없이 입력해주세요', { severity: 'warning' });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setLoginForm((prev) => ({
        ...prev,
        phone: value.toString(),
      }));
    } else {
      setLoginForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };
  return (
    <>
      <InputWrapper>
        <Input
          name="phone"
          value={loginForm.phone}
          placeholder="전화번호"
          type="number"
          autoComplete="username"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === '-' || e.key === '+' || e.key === 'e') {
              e.preventDefault();
              setIsPhoneValid(false);
              setTimeout(() => setIsPhoneValid(true), 2000);
            }
          }}
        />
        {!isPhoneValid && (
          <ErrorText>"-"를 제외한 숫자만 입력해 주세요</ErrorText>
        )}
        <Input
          name="password"
          value={loginForm.password}
          placeholder="비밀번호"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <CheckboxWrapper>
          <HiddenCheckbox
            checked={loginForm.rememberPhone}
            onChange={(e) =>
              setLoginForm((prev) => ({
                ...prev,
                rememberPhone: e.target.checked,
              }))
            }
          />
          <Checkbox />
          <CheckboxLabel>아이디 저장</CheckboxLabel>
        </CheckboxWrapper>
        <LoginButton type="button" onClick={onSubmit}>
          로그인
        </LoginButton>
      </InputWrapper>
    </>
  );
};

export default Login;
