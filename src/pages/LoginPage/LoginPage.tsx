import { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';

import Login from './components/Login';
import Join from './components/Join';

const LoginPage = () => {
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

        {isLogin ? <Login /> : <Join />}
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
  transition: 0.4s all ease-in-out;
`;
