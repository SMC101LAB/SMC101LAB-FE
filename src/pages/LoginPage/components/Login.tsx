import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, InputWrapper, LoginButton } from './Style';
import { useMutation } from '@tanstack/react-query';
import { authAPI, LoginFormType } from '../../../apis/Auth';

const Login = () => {
  const nav = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    phone: '',
    password: '',
  });

  const joinMutation = useMutation({
    mutationFn: (data: LoginFormType) => authAPI.login(data),
    onSuccess: () => {
      alert('로그인 성공');
      setLoginForm({
        phone: '',
        password: '',
      });
    },
    onError: (error) => {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error('join Error:', error);
    },
  });

  const onSubmit = () => {
    const isFormFilled = Object.values(loginForm).every(
      (value) => value !== ''
    );
    if (isFormFilled) {
      joinMutation.mutate(loginForm);
      nav('/manage/map');
    } else {
      alert('빈칸 없이 입력해주세요.');
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
    console.log(loginForm);
  };
  return (
    <InputWrapper>
      <Input
        name="phone"
        value={loginForm.phone}
        placeholder="전화번호"
        onChange={handleChange}
      />
      <Input
        name="password"
        value={loginForm.password}
        placeholder="비밀번호"
        type="password"
        onChange={handleChange}
      />
      <LoginButton onClick={onSubmit}>로그인</LoginButton>
    </InputWrapper>
  );
};

export default Login;
