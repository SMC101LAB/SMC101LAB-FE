import { createGlobalStyle } from 'styled-components';
import PretendardLight from '../assets/fonts/Pretendard-Light.woff2';
import PretendardMedium from '../assets/fonts/Pretendard-Medium.woff2';
import PretendardBold from '../assets/fonts/Pretendard-Bold.woff2';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardLight}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  
  html, body, #root, * {
    font-family: 'Pretendard', sans-serif !important; 
  }

 

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  input {
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
