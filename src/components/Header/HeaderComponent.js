import React, { useEffect, useState } from "react";
import LinkButton from "../elements/LinkButton";
import styled, { css, useTheme } from "styled-components";
import { useLocation } from "react-router-dom";

const transition = (time) => {
   return css`
      -webkit-transition: -webkit-transform ${time}s ease-out;
      transition: -webkit-transform ${time}s ease-out;
      transition: transform ${time}s ease-out;
      transition: transform ${time}s ease-out,
         -webkit-transform ${time}s ease-out;
   `;
};
const transformY = (y) => {
   return css`
      transform: translateY(${y});
      -webkit-transform: translateY(${y}});
   `;
};

//margin left 구하기
const getMarginLeft = (elemNum, putRight, b, s) => {
   const result = b * (elemNum - putRight - 1) + s * (putRight + 1);
   if (result > 0) return result;
   else return 0;
};

const StyledHeader = styled.div`
   position: fixed;
   height: ${({ height }) => height || "64px"};

   /*파라미터로 넘어온 걸 우선, 없으면 테마, 없으면 디폴트값*/
   background-color: ${({ backgroundColor, theme }) =>
      backgroundColor || theme.color.white || "#FCFDFF"};
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
   z-index: 3000;
   /* 스윽 사라지게 하는 거*/
   &.down {
      ${transformY("-100%")}
      ${transition(0.7)}
   }
   &.up {
      ${transformY("0")}
      ${transition(0.3)}
   }

   /*margin-left: 패딩을 제외한 전체 넓이에서 엘리먼트 넓이의 총합을 빼고 남은 넓이만*/
   span.right {
      margin-left: ${({ elemNum, putRight }) =>
         1200 - getMarginLeft(elemNum, putRight, 200, 100)}px;
   }

   /* 폰트 적용 : 테마가 있으면 적용하되, 없으면 상속*/
   font-family: ${({ theme }) => theme.font.medium};

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
      height: ${({ roundHeight }) => roundHeight || "32px"};
      line-height: ${({ roundHeight }) => roundHeight || "32px"};
   }
   /*반응형*/
   ${({ theme }) =>
      css`
         @media screen and ${theme.size.tabletL} {
            padding: 0 ${({ halfInWidth }) => halfInWidth - 500}px;
            span.button {
               width: 150px;
            }
            span.right {
               margin-left: ${({ elemNum, putRight }) =>
                  1000 - getMarginLeft(elemNum, putRight, 150, 100)}px;
            }
         }
         @media screen and ${theme.size.tabletS} {
            padding: 0 ${({ halfInWidth }) => halfInWidth - 380}px;
            span.button {
               width: 100px;
            }
            span.small {
               width: 80px;
            }
            span.right {
               margin-left: ${({ elemNum, putRight }) =>
                  760 - getMarginLeft(elemNum, putRight, 100, 80)}px;
            }
         }
         @media screen and ${theme.size.mobileL} {
            padding: 0 ${({ halfInWidth }) => halfInWidth - 230}px;
            span.button {
               width: 80px;
            }
            span.small {
               width: 60px;
            }
            span.round {
               width: 80px;
            }
            span.right {
               margin-left: 50px;
            }
         }
      `}
`;

/*
         LinkButton으로 만든 헤더 스타일.
         - 첫번째 버튼은 로고 이미지, 맨 마지막 버튼은 로그인 버튼을 넣는다고 가정
         - 너비는 100%를 차지하되, 버튼들이 
            1280px 이상일 시 1200px 안으로,
            1280px 미만일 시 1000px 안으로
            1023px 미만일 시 760px 안으로
            770px 미만일 시 460px 안으로 오도록 함.
         - 버튼들의 크기는 작은버튼=로고버튼=라운드버튼이고,
            1280px 이상일 시, 큰버튼 200px, 작은버튼 100px
            1280px 미만일 시 큰버튼 150px, 작은버튼 100px
            1023px 미만일 시, 100px, 80px
            770px 미만일 시,  80px, 60px로 조절함
         - 버튼들이 넘칠 경우 스크롤로 옆으로 넘겨줄 수 있음.
         - 현재 주소를 트래킹해서 현재 주소이면 밝기가 밝아지고 밑줄이 생김

         파라미터
         - link엔 각 LinkButton에 넣을 to, param, query를 객체 배열로 넘겨줌
         - content엔 넣을 내용을 객체 배열로 넣어줌.
         - headerStyle엔 다음 내용을 넣어서 커스텀 가능
            height : "", 헤더의 높이
            backgoundColor : "", 헤더의 배경
            onColor : "", 현재 주소 창일시 사용할 버튼의 색깔
            outColor : "", 현재가 아닐 시 사용할 색깔
            roundColor : "", 라운드 버튼의 배경색
            roundHeight : "", 라운드 버튼의 높이 지정가능
            fontSize : 버튼들의 폰트 크기
         -putRight : 오른쪽에 정렬할 버튼의 개수. 
            디폴트는 login, join 두개가 온다고 가정하여 2
*/

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
   const [halfInWidth, setHalfInWidth] = useState(window.innerWidth / 2);
   const [className, setClassName] = useState("");
   const location = useLocation();
   const theme = useTheme();

   useEffect(() => {
      setPaths(link);
      setContents(content);
      setLeft([]);
      setRight([]);
      const color = {
         outColor: headerStyle.outColor || theme.color.text || "#4F75BB",
         onColor: headerStyle.onColor || theme.color.title || "#1A4188",
         roundColor: headerStyle.roundColor || theme.color.primary || "#86A8E7",
      };
      paths.forEach((path, index) => {
         const isRight = paths.length - index <= putRight;
         let className = "button";
         let style = {
            opacity: 0.6,
            color: color.outColor,
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
               color: color.onColor,
               roundColor: color.roundColor,
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
               color: color.onColor,
               opacity: 1,
               borderBottom: true,
            };
         }
         const component = (
            <LinkButton
               key={index}
               path={path}
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
   }, [
      link,
      paths,
      content,
      putRight,
      contents,
      headerStyle.roundColor,
      headerStyle.onColor,
      headerStyle.outColor,
      headerStyle.fontSize,
      location,
      theme,
      halfInWidth,
   ]);

   useEffect(() => {
      const onResize = () => setHalfInWidth(window.innerWidth / 2);
      const onScroll = () => {
         const y = window.scrollY;
         const h = document.getElementById("Header").clientHeight;
         if (className === "down" && y <= h) {
            setClassName("up");
         }
         if (y > h) {
            setClassName("down");
         }
      };
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll);
      return () => {
         window.removeEventListener("resize", onResize);
         window.removeEventListener("scroll", onScroll);
      };
   }, [className]);

   return (
      <StyledHeader
         id="Header"
         {...headerStyle}
         elemNum={paths.length}
         putRight={putRight}
         halfInWidth={halfInWidth}
         className={className}
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
