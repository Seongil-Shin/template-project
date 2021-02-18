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
);
