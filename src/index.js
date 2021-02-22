<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import GlobalStyle from "./style/GlobalStyle";

ReactDOM.render(
   <ThemeProvider theme={theme}>
      <GlobalStyle />
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </ThemeProvider>,
   document.getElementById("root")
=======
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from 'styled-components'
import theme from './style/theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </ThemeProvider>,
  document.getElementById('root')
>>>>>>> feature/2
);
