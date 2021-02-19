import React, { useEffect, useState } from "react";
import { LinkButton } from "../elements/LinkButton";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const StyledHeader = styled.div`
   width: ${(props) => props.width || "100%"};
   height: ${(props) => props.height || "64px"};
   background: ${(props) => props.backgroundColor || /*테마*/ "#FCFDFF"} 0% 0%
      no-repeat padding-box;
   box-shadow: 0px 3px 6px #00000029;
   padding: 0 20%;

   /* 넘칠 시 옆으로 스크롤하되, 스크롤은 숨기기*/
   overflow: scroll;
   white-space: nowrap;

   -ms-overflow-style: none; /* IE and Edge */
   scrollbar-width: none; /* Firefox */
   &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
   }

   span.right {
      margin-left: ${(props) => props.paths && 100 - 40 - props.paths * 10}%;
   }

   /* 폰트 확인 */
   font-family: ${(props) => props.theme.font.medium};
`;

export default function Header({
   link = [{ to: "/" }],
   content = [{ string: "pass a content" }],
   headerStyle = {},
   putRight = 2,
}) {
   const [paths, setPaths] = useState([]);
   const [contents, setContents] = useState([]);
   const [left, setLeft] = useState([]);
   const [right, setRight] = useState([]);
   const location = useLocation();

   useEffect(() => {
      setPaths(link);
      setContents(content);
      setLeft([]);
      setRight([]);
      paths.forEach((path, index) => {
         const isRight = paths.length - index <= putRight;

         let style = {
            width: "10%",
            height: headerStyle.height || "64px",
            opacity: 0.6,
            color: headerStyle.outColor || /* 테마*/ "#4F75BB",
         };

         if (index === 0 || isRight) {
            style = { ...style, width: "5%", opacity: 1 };
         }
         if (isRight && index === paths.length - 1) {
            style = {
               ...style,
               isRound: true,
               color: headerStyle.onColor || /* 테마*/ "#1A4188",
               backgroundColor: headerStyle.roundColor || /* 테마*/ "#86A8E7",
               height: "32px",
            };
         }

         /*on 확인 후 색깔 변경 및 밑줄*/
         if (
            location.pathname.startsWith(path.to) &&
            index !== 0 &&
            index !== paths.length - 1
         ) {
            style = {
               ...style,
               color: headerStyle.onColor || /*테마*/ "#1A4188",
               opacity: 1,
               borderBottom: true,
            };
         }

         const component = (
            <LinkButton
               key={index}
               {...path}
               {...contents[index]}
               buttonStyle={style}
            />
         );

         if (isRight) {
            setRight((prev) => [...prev, component]);
         } else {
            setLeft((prev) => [...prev, component]);
         }
      });
   }, [
      link,
      content,
      paths,
      putRight,
      contents,
      headerStyle.roundColor,
      headerStyle.height,
      headerStyle.onColor,
      headerStyle.outColor,
      location,
   ]);

   return (
      <StyledHeader {...headerStyle} paths={paths.length - putRight / 2 - 0.5}>
         {left.map((left) => {
            return left;
         })}
         <span className="right">
            {right.map((right) => {
               return right;
            })}
         </span>
      </StyledHeader>
   );
}
