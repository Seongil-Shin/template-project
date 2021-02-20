import React, { useEffect, useState } from "react";
import { LinkButton } from "../elements/LinkButton";
import styled, { useTheme } from "styled-components";
import { useLocation } from "react-router-dom";

const StyledHeader = styled.div`
   width: ${({ width }) => width || "100%"};
   height: ${({ height }) => height || "64px"};

   /*파라미터로 넘어온 걸 우선, 없으면 테마, 없으면 디폴트값*/
   background: ${({ backgroundColor, theme }) =>
         backgroundColor ||
         (theme && theme.color && theme.color.white) ||
         "#FCFDFF"}
      0% 0% no-repeat padding-box;
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

   /*margin-left: 전체 넓이에서 패딩 빼고 엘리먼트 넓이의 총합을 빼고 남은 넓이만*/
   span.right {
      margin-left: ${({ elemNum }) => 100 - 40 - elemNum * 10}%;
   }

   /* 폰트 적용 : 테마가 있으면 적용하되, 없으면 상속*/
   font-family: ${({ theme }) => theme && theme.font && theme.font.medium};
`;

export default function HeaderComponent({
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
   const theme = useTheme();

   useEffect(() => {
      setPaths(link);
      setContents(content);
      setLeft([]);
      setRight([]);
      let color = {};
      if (theme && theme.color) {
         color = {
            outColor: theme.color.text,
            onColor: theme.color.title,
            roundColor: theme.color.primary,
         };
      }
      paths.forEach((path, index) => {
         const isRight = paths.length - index <= putRight;

         let style = {
            width: "10%",
            height: headerStyle.height || "64px",
            opacity: 0.6,
            color: headerStyle.outColor || color.outColor || "#4F75BB",
            fontSize: headerStyle.fontSize || "14px",
         };

         if (index === 0 || isRight) {
            style = { ...style, width: "5%", opacity: 1 };
         }
         if (isRight && index === paths.length - 1) {
            style = {
               ...style,
               isRound: true,
               color: headerStyle.onColor || color.onColor || "#1A4188",
               backgroundColor:
                  headerStyle.roundColor || color.roundColor || "#86A8E7",
               height: "32px",
            };
         }

         /*on 확인 후 색깔 변경 및 밑줄*/
         if (
            location.pathname.startsWith(path.to) &&
            index !== 0 &&
            !style.isRound
         ) {
            style = {
               ...style,
               color: headerStyle.onColor || color.onColor || "#1A4188",
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
      headerStyle.fontSize,
      location,
      theme,
   ]);

   return (
      <StyledHeader
         {...headerStyle}
         elemNum={paths.length - putRight / 2 - 0.5}
      >
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
