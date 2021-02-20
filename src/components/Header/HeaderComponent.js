import React, { useEffect, useState } from "react";
import { LinkButton } from "../elements/LinkButton";
import styled, { css, useTheme } from "styled-components";
import { useLocation } from "react-router-dom";

const StyledHeader = styled.div`
   height: ${({ height }) => height || "64px"};

   /*파라미터로 넘어온 걸 우선, 없으면 테마, 없으면 디폴트값*/
   background: ${({ backgroundColor, theme }) =>
         backgroundColor ||
         (theme && theme.color && theme.color.white) ||
         "#FCFDFF"}
      0% 0% no-repeat padding-box;
   box-shadow: 0px 3px 6px #00000029;
   padding: 0 ${({ halfInWidth }) => halfInWidth - 600}px;

   /* 넘칠 시 옆으로 스크롤하되, 스크롤은 숨기기*/
   overflow-x: scroll;
   white-space: nowrap;

   -ms-overflow-style: none; /* IE and Edge */
   scrollbar-width: none; /* Firefox */
   &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
   }

   /*margin-left: 전체 넓이에서 패딩 빼고 엘리먼트 넓이의 총합을 빼고 남은 넓이만*/
   div.right {
      justify-content: flex-end;
   }
   /* 폰트 적용 : 테마가 있으면 적용하되, 없으면 상속*/
   font-family: ${({ theme }) => theme && theme.font && theme.font.medium};

   /*휘하 버튼들 크기 조절 tabletL 이상일 때*/
   span {
      height: 100%;
   }
   span.button {
      width: 200px;
   }
   span.small {
      width: 100px;
   }
   span.round {
      width: 100px;
      height: ${({ height }) => height / 2 || "32px"};
      line-height: ${({ height }) => height / 2 || "32px"};
   }
   /*반응형*/
   ${({ theme }) =>
      theme &&
      theme.size &&
      css`
         @media screen and ${theme.size.mobileL} {
            padding: 0 ${({ halfInWidth }) => halfInWidth - 230}px;
            span.button {
               width: 100px;
            }
         }
         @media screen and ${theme.size.tabletS} {
            padding: 0 ${({ halfInWidth }) => halfInWidth - 380}px;
            span.button {
               width: 150px;
            }
         }
         @media screen and ${theme.size.tabletL} {
            padding: 0 ${({ halfInWidth }) => halfInWidth - 500}px;
         }
      `}
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
   const [innerWidth, setInnerWidth] = useState(window.innerWidth / 2);
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
         let className = "button";
         let style = {
            opacity: 0.6,
            color: headerStyle.outColor || color.outColor || "#4F75BB",
            fontSize: headerStyle.fontSize || "14px",
         };

         if (index === 0 || isRight) {
            style = { ...style, opacity: 1 };
            className = "small";
         }
         if (isRight && index === paths.length - 1) {
            style = {
               ...style,
               isRound: true,
               color: headerStyle.onColor || color.onColor || "#1A4188",
               backgroundColor:
                  headerStyle.roundColor || color.roundColor || "#86A8E7",
            };
            className = "round";
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
               name={className}
            />
         );

         if (isRight) {
            setRight((prev) => [...prev, component]);
         } else {
            setLeft((prev) => [...prev, component]);
         }
      });
      console.log(innerWidth);
   }, [
      link,
      paths,
      content,
      putRight,
      contents,
      headerStyle.roundColor,
      headerStyle.height,
      headerStyle.onColor,
      headerStyle.outColor,
      headerStyle.fontSize,
      location,
      theme,
      innerWidth,
   ]);

   useEffect(() => {
      const handle = () => setInnerWidth(window.innerWidth / 2);
      window.addEventListener("resize", handle);
      return () => {
         window.removeEventListener("resize", handle);
      };
   }, []);

   return (
      <StyledHeader
         {...headerStyle}
         elemNum={paths.length - putRight / 2 - 0.5}
         halfInWidth={innerWidth}
      >
         {left.map((left) => {
            return left;
         })}
         <div className="right">
            {right.map((right) => {
               return right;
            })}
         </div>
      </StyledHeader>
   );
}
