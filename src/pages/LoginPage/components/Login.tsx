import { useNavigate } from 'react-router-dom';
import { Input, InputWrapper, LoginButton } from './Style';
const Login = () => {
  const nav = useNavigate();

  return (
    <InputWrapper>
      <Input placeholder="전화번호" />
      <Input placeholder="비밀번호" type="password" />
      <LoginButton onClick={() => nav('/map')}>로그인</LoginButton>
    </InputWrapper>
  );
};

export default Login;
