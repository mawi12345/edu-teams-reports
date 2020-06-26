import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  #root {
    min-height: 100vh;
    min-width: 100%;
  }

  #root > div {
    min-height: 100vh;
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
