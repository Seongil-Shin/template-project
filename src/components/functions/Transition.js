import { css } from "styled-components";

export const transition = (time) => {
   return css`
      -webkit-transition: -webkit-transform ${time}s ease-out;
      transition: -webkit-transform ${time}s ease-out;
      transition: transform ${time}s ease-out;
      transition: transform ${time}s ease-out,
         -webkit-transform ${time}s ease-out;
   `;
};

export const transformY = (y) => {
   return css`
      transform: translateY(${y});
      -webkit-transform: translateY(${y}});
   `;
};

export const transformX = (x) => {
   return css`
      transform: translateX(${x}px);
      -webkit-transform: translateX(${x}px);
   `;
};
