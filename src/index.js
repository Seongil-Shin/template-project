import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ParallaxProvider } from "react-scroll-parallax";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import { Provider } from "react-redux";
import configureStore from "./stores";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore();

ReactDOM.render(
   <ThemeProvider theme={theme}>
      <ParallaxProvider>
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <App />
            </PersistGate>
         </Provider>
      </ParallaxProvider>
   </ThemeProvider>,
   document.getElementById("root")
);
