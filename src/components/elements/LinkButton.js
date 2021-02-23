import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledLink = styled.span`
   display: inline-block;

   width: ${({ width }) => width || "200px"};
   height: ${({ height }) => height || "64px"};

   text-align: center;
   line-height: ${({ height }) => height || "64px"};

   img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
   }
   span {
      color: ${({ color, theme }) =>
         color || (theme && theme.color && theme.color.title) || "#1A4188"};
      font-size: ${({ fontSize }) => fontSize || "14px"};
      opacity: ${({ opacity }) => opacity || "1"};
   }

   ${({ isRound, roundColor, theme }) =>
      isRound &&
      css`
         background-color: ${roundColor ||
         (theme && theme.color && theme.color.primary) ||
         "#86A8E7"};
         border-radius: 32px;
      `}
   ${({ borderBottom, color, theme }) =>
      borderBottom &&
      css`
         box-sizing: border-box;
         border-bottom: 2px solid;
         border-bottom-color: ${color ||
         (theme && theme.color && theme.color.title) ||
         "#1A4188"};
      `}
`;

//to : url, param : 파라미터, query : 쿼리, data : 넘겨줄 데이터.
//isImage : 이미지인지 표시, content : 이미지이면 주소, 아니면 쓸 내용
/*buttonStyle 다음 style들을 객체 형태로 넘김
   각 요소는 디폴트 값이 정해져 있어서 필요한 것만 넘겨줘도 된다.
            width : "",
            height : "",
            color : "",
            fontSize : "",
            opacity : "",
            isRound : true || false,
            roundColor : ""             // round 일때만 적용
            borderBottom : true || false

   color는 넘겨준게 없을 경우 테마 -> 디폴트로 적용됨.
   테마는 theme.color.title 형식으로 줘야 적용됨. 
   이 형식이 아니면 없는걸로 간주하고 디폴트값 적용
*/
//name : 만약 상위에서 className으로 스타일을 지정하고 싶으면 name을 넘김

const LinkButton = ({
   to = "/",
   param = "",
   query = "",
   data,
   isImage = false,
   content,
   buttonStyle = {},
   name = "",
}) => {
   return (
      <Link to={{ pathname: to + param, search: query, state: data }}>
         <StyledLink {...buttonStyle} className={name}>
            {isImage ? (
               <img src={content} alt="pass a src as content=[src]" />
            ) : (
               <span>{content || to}</span>
            )}
         </StyledLink>
      </Link>
   );
};

export default React.memo(LinkButton);
