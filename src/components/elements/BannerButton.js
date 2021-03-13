import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import React from "react";

/* essential props
  fontSize : big || small
  bg: background color
  color: text color
  opacity: background transparent
  align
  link: onClick link
  text : button text
*/

const Button = styled.button`
   font-size: ${(props) => (props.fontSize === "big" ? "24px" : "20px")};
   background-color: ${(props) =>
      props.opacity === "불투명" ? props.bg : "rgba( 255, 255, 255, 0 )"};
   box-shadow: 0px 3px 6px #00000029;
   max-width: 252px;
   width: 60%;
   height: 64px;
   margin: ${(props) => (props.align === "center" ? "0 auto" : "0")};
   margin-top: 20px;
   border-radius: 25px;
   border: 2px solid ${(props) => props.bg};
   outline: 0;
   cursor: pointer;

   & a {
      text-decoration: none;
   }
   & span {
      color: ${(props) => props.color};
   }

   @media ${(props) => props.theme.size.mobileS} {
      font-size: 20px;
   }
`;

function BannerButton(props) {
   return (
      <>
         <Button
            fontSize={props.fontSize}
            bg={props.bg}
            color={props.color}
            opacity={props.opacity}
            align={props.align}
         >
            {props?.link?.indexOf("http") < 0 ? (
               <Link to={props.link}>
                  <span>{props.text}</span>
               </Link>
            ) : (
               <a href={props.link}>
                  <span>{props.text}</span>
               </a>
            )}
         </Button>
      </>
   );
}

export default BannerButton;
