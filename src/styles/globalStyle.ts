import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
