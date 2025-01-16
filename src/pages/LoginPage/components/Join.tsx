import { ErrorText, Input, InputWrapper, LoginButton } from './Style';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authAPI, JoinFormType } from '../../../apis/Auth';

const Join = () => {
  const [joinForm, setJoinForm] = useState<JoinFormType>({
    name: '',
    phone: '',
    organization: '',
    password: '',
  });
  const [pwCheck, setPwCheck] = useState<string>('');
  const [pwVerfiy, setPwVerify] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setJoinForm((prev) => ({
        ...prev,
        phone: value.toString(),
      }));
    } else {
      setJoinForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    console.log(joinForm);
  };

  const handlePwCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== joinForm.password) setPwVerify(false);
    else setPwVerify(true);
    setPwCheck(e.target.value);
  };

  const joinMutation = useMutation({
    mutationFn: (data: JoinFormType) => authAPI.join(data),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      setJoinForm({
        name: '',
        phone: '',
        organization: '',
        password: '',
      });
      setPwCheck('');
    },
    onError: (error) => {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      console.error('join Error:', error);
    },
  });

  const onSubmit = () => {
    const isFormFilled = Object.values(joinForm).every((value) => value !== '');
    if (pwVerfiy && isFormFilled) {
      joinMutation.mutate(joinForm);
    } else {
      alert('정보를 정확히 입력해주세요.');
    }
  };
  return (
    <InputWrapper>
      <Input
        name="name"
        value={joinForm.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <Input
        name="organization"
        value={joinForm.organization}
        onChange={handleChange}
        placeholder="소속"
      />
      <Input
        type="number"
        name="phone"
        value={joinForm.phone}
        onChange={handleChange}
        placeholder="전화번호"
      />
      <Input
        name="password"
        value={joinForm.password}
        onChange={handleChange}
        placeholder="비밀번호"
        type="password"
      />
      <Input
        name="pwCheck"
        value={pwCheck}
        onChange={handlePwCheckChange}
        placeholder="비밀번호 확인"
        type="password"
      />
      {!pwVerfiy && <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>}
      <LoginButton onClick={onSubmit}>회원가입</LoginButton>
    </InputWrapper>
  );
};

export default Join;
