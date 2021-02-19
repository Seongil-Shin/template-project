import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledLink = styled.span`
   display: inline-block;

   width: ${(props) => props.buttonStyle.width || "200px"};
   height: ${(props) => props.buttonStyle.height || "64px"};

   text-align: center;
   line-height: ${(props) => props.buttonStyle.height || "64px"};

   img {
      height: 90%;
      vertical-align: middle;
   }
   span {
      color: ${(props) => props.buttonStyle.color || /*테마*/ "#1A4188"};
      font-size: ${(props) => props.buttonStyle.fontSize || "14px"};
      opacity: ${(props) => props.buttonStyle.opacity || "1"};
   }
   ${(props) =>
      props.buttonStyle.isRound &&
      css`
         background-color: ${(props) =>
            props.buttonStyle.backgroundColor || /* 테마*/ "#86A8E7"};
         border-radius: 32px;
      `}
   ${(props) =>
      props.buttonStyle.borderBottom &&
      css`
         box-sizing: border-box;
         border-bottom: solid;
         border-bottom-color: ${(props) =>
            props.buttonStyle.color || /*테마*/ "#1A4188"};
      `}
`;

//path에 주소, isImage에 이미지인지, string에 이미지 주소 또는 문자열, data엔 path로 이동 시 넘길 데이터

export const LinkButton = ({
   to = "/",
   params = "",
   query = "",
   data,
   isImage = false,
   string,
   buttonStyle = {},
}) => {
   return (
      <Link to={{ pathname: to + params, search: query, state: data }}>
         <StyledLink buttonStyle={buttonStyle}>
            {isImage ? (
               <img src={string} align="top" alt="pass a src as string=[src]" />
            ) : (
               <span>{string || to}</span>
            )}
         </StyledLink>
      </Link>
   );
};
