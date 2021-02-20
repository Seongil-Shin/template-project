import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledLink = styled.span`
   display: inline-block;

   width: ${({ width }) => width || "200px"};
   height: ${({ height }) => height || "64px"};

   text-align: center;
   line-height: ${({ height }) => height || "64px"};

   img {
      height: 90%;
      vertical-align: middle;
   }
   span {
      color: ${({ color, theme }) =>
         color || (theme && theme.color && theme.color.title) || "#1A4188"};
      font-size: ${({ fontSize }) => fontSize || "14px"};
      opacity: ${({ opacity }) => opacity || "1"};
   }

   ${({ isRound, backgroundColor, theme }) =>
      isRound &&
      css`
         background-color: ${backgroundColor ||
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
         <StyledLink {...buttonStyle}>
            {isImage ? (
               <img src={string} align="top" alt="pass a src as string=[src]" />
            ) : (
               <span>{string || to}</span>
            )}
         </StyledLink>
      </Link>
   );
};
