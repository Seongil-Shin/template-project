import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled.span`
   display: inline-block;

   width: ${(props) => props.buttonStyle.width};
   height: ${(props) => props.buttonStyle.height};

   text-align: center;
   line-height: ${(props) => props.buttonStyle.height};

   img {
      height: 90%;
      vertical-align: middle;
   }
   span {
      color: ${(props) => props.buttonStyle.color};
      font-size: ${(props) => props.buttonStyle.fontSize};
      font-family: ${(props) => props.theme.fontFamily}, sans-serif;
      letter-spacing: 0px;
      opacity: ${(props) => (props.buttonStyle.on ? "1" : "0.6")};
   }
`;

//path에 주소, isImage에 이미지인지, string에 이미지 주소 또는 문자열, data엔 path로 이동 시 넘길 데이터

export const LinkButton = ({
   path = "/",
   params = "",
   query = "",
   data,
   isImage = false,
   string = "put a string",
   buttonStyle = {
      width: "200px",
      height: "64px",
      color: "#4F75BB",
      fontSize: "14px",
      on: true,
   },
}) => {
   const [pathname, setPathname] = useState(path);
   useEffect(() => {
      setPathname(path);
      if (params) {
         setPathname((prev) => prev + `/${params}`);
      }
      if (query) {
         setPathname((prev) => prev + `?${query}`);
      }
   }, [path, params, query]);

   return (
      <Link to={{ pathname: pathname, state: data }}>
         <StyledLink isImage={isImage} buttonStyle={buttonStyle}>
            {isImage ? (
               <img src={string} align="top" alt="error" />
            ) : (
               <span>{string}</span>
            )}
         </StyledLink>
      </Link>
   );
};
