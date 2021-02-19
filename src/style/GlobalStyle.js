import { createGlobalStyle } from "styled-components";
import "./fonts.css";

const GlobalStyle = createGlobalStyle`
  
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.font.regular};
  }
`;

export default GlobalStyle;
