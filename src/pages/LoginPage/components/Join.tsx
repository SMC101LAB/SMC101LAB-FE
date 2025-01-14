import { Input, InputWrapper, LoginButton } from './Style';
import { useState } from 'react';
const Join = () => {
  interface JoinFormType {
    name: string;
    phone: string;
    organization: string;
    password: string;
  }
  const [joinForm, setJoinForm] = useState<JoinFormType>({
    name: '',
    phone: '',
    organization: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJoinForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <InputWrapper>
      <Input
        placeholder="이름"
        name="name"
        value={joinForm.name}
        onChange={handleChange}
      />
      <Input placeholder="소속" />
      <Input placeholder="전화번호" />
      <Input placeholder="비밀번호" type="password" />
      <Input placeholder="비밀번호 확인" type="password" />
      <LoginButton onClick={() => alert('회원가입이 완료되었습니다.')}>
        회원가입
      </LoginButton>
    </InputWrapper>
  );
};

export default Join;
