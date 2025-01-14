import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const LoginPage = () => {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <Background>
      <LoginContainer>
        <LogoContainer src={logo} alt="logo" />
        <TabContainer>
          <TabButton
            $isLogin={isLogin}
            onClick={() => {
              setIsLogin(true);
            }}
          >
            로그인
          </TabButton>
          <TabButton
            $isLogin={!isLogin}
            onClick={() => {
              setIsLogin(false);
            }}
          >
            회원가입
          </TabButton>
        </TabContainer>
        <InputWrapper>
          <Input placeholder="아이디" />
          <Input placeholder="비밀번호" type="password" />
          <LoginButton onClick={() => nav('/map')}>로그인</LoginButton>
        </InputWrapper>
      </LoginContainer>
    </Background>
  );
};

export default LoginPage;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoContainer = styled.img`
  width: 100%;
`;
const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 0 30px;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 6px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TabButton = styled.button<{ $isLogin?: boolean }>`
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $isLogin, theme }) =>
    $isLogin ? theme.colors.primary : 'transparent'};
  color: ${({ $isLogin, theme }) => ($isLogin ? theme.colors.white : '#666')};
  font-weight: ${({ $isLogin, theme }) =>
    $isLogin ? theme.fonts.weights.bold : theme.fonts.weights.medium};
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 18px 10px;
  border: 0px;
  color: ${({ theme }) => theme.colors.grey[700]};
  background-color: ${({ theme }) => theme.colors.grey[200]};

  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  margin-top: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;
