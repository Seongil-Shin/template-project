import { createGlobalStyle } from "styled-components";
import "./fonts.css";

const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.font.regular};
    background: transparent linear-gradient(90deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%) 0% 0% no-repeat padding-box;
  }
`;

export default GlobalStyle;
