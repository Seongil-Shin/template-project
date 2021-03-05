import React, { useEffect, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import drag from "../functions/Drag";

/*
   카드 쭉 나열한 곳.
   width 를 기준으로 모든 크기를 정하였으므로 나중에 수정할때 width만 바꾸면 됨
*/
const CardDisplay = styled.div`
   display: table;
   position: relative;
   z-index: 1000;

   ${({ width, fontColor, num, theme }) => css`
      width: ${num * 3 * width}px;
      height: ${width * 1.3}px;

      color: ${fontColor || theme.color.white || "#FCFDFF"};

      div {
         opacity: 0;
         height: ${width * 0.1}px;
      }
      span {
         display: table-cell;
         vertical-align: middle;
         padding: 0 ${width * 0.05}px;
         opacity: 0.3;
         width: ${width}px;
      }
      span.current {
         opacity: 1;
         div {
            transition: opacity 0.3s linear 0.1s;
            opacity: 1;
         }
         div.subject {
            font-size: ${width * 0.07}px;
            font-family: ${({ theme }) => theme.font.bold};
         }
         div.description {
            font-size: ${width * 0.06}px;
            font-family: ${theme.font.regular};
         }
      }
      img {
         width: ${width * 0.9}px;
         height: auto;
         border-radius: 10px;
      }
   `}
`;

/*
      스와이퍼 감싸는 div
      frame 은 가운데 틀
*/
const Swiper = styled.div`
   position: relative;
   overflow: hidden;
   background-color: ${({ bgColor }) => bgColor};
   span.frame {
      display: inline-block;
      position: absolute;
      z-index: 0;
      background-color: ${({ theme, frameColor }) =>
         frameColor || theme.color.gray || "#B8C7E2"};
      ${({ width }) => css`
         left: ${(window.innerWidth - width) / 2}px;
         width: ${width}px;
         height: 100%;
         border-radius: ${width * 0.1}px;
      `}
   }
`;

/*
   inputCards 에 카드에 들어갈 내용을 객체 배열 형태로 넣음.
   각 객체는 다음과 같은 원소가 있어야함
      image : "", 
      subject : "", 
      description : ""

   swiperStyle 은 원하는 스타일을 지정. 
   지정할 수 있는 스타일은 다음 3가지
      fontColor : "",
      bgColor : "",     // swiper 자체의 배경색
      frameColor : "",  // 가운데 틀의 배경색  

*/
function ImageSwiper({ inputCards = [], swiperStyle = {} }) {
   const [cards, setCards] = useState([]);

   const [width, setWidth] = useState(500);
   const [refresh, setRefresh] = useState(0);
   const [current, setCurrent] = useState(0);
   const breakPoint = useTheme().size;

   /* 들어온 카드의 * 3 개를 깜 */
   useEffect(() => {
      setCards([...inputCards, ...inputCards, ...inputCards]);
   }, [inputCards]);

   /*
      width가 변하면 밑 useEffect 들도 인지하고 다시 업데이트 해야 하므로 
      자바스크립트로 반응형을 구현함.
   */
   useEffect(() => {
      const mediase = [
         window.matchMedia(breakPoint.mobileL || "(max-width: 770px)"),
         window.matchMedia(breakPoint.tabletS || "(max-width: 1023px)"),
         window.matchMedia(breakPoint.laptop || "(max-width: 1460px)"),
      ];
      const handle = () => {
         if (mediase[0].matches) {
            setWidth(280);
         } else if (mediase[1].matches) {
            setWidth(320);
         } else if (mediase[2].matches) {
            setWidth(400);
         } else {
            setWidth(500);
         }
      };
      for (const media of mediase) {
         media.addEventListener("change", handle);
      }
      handle();
      return () => {
         for (const media of mediase) {
            media.removeEventListener("change", handle);
         }
      };
   }, [breakPoint]);

   /* 
      크게 2가지 함수로 구성됨
      callback : 드래그 이벤트가 끝났을 때, 끝났을 때의 위치를 cur에, 처음 요소의 left 위치를 left에 받음.
               두 변수를 보고 원래 위치에서 얼마나 떨어져있는지 검사하고 적절한 위치로 보냄.
               그리고 current 상태를 정한다
      init : 3초마다 또는 드래그로 시작된 카드 transition이 끝났을 때, underflow나 overflow가 발생했을 경우 적절한 위치로 다시 보냄. 
   */
   useEffect(() => {
      const elmnt = document.getElementById("CardDisplay");
      const lapse = inputCards.length * width;
      const fcwidth = (window.innerWidth - width) / 2;

      const callback = (cur, left) => {
         const start = fcwidth - lapse;
         const end = fcwidth - lapse * 2 + width;
         const rest = -((cur - fcwidth) % width);
         const wid2 = width / 2;

         elmnt.style.transition = "all 0.3s";
         let pullRight = true;
         if (cur <= start + wid2 && cur > end - wid2) {
            if (left < cur && left + wid2 >= cur) {
               pullRight = false;
            } else if (left - wid2 > cur) {
               pullRight = false;
            }
         } else if (cur <= end - wid2) {
            pullRight = false;
         }

         let traslateX = 0;
         if (pullRight) {
            elmnt.style.transform = `translateX(+${rest}px)`;
            traslateX = rest;
         } else {
            elmnt.style.transform = `translateX(${rest - width}px)`; //왼쪽으로 끌어당김
            traslateX = rest - width;
         }

         const newCurrent = Math.round(
            (cur + traslateX + lapse - fcwidth) / width
         );
         if (newCurrent > 0) {
            setCurrent(inputCards.length - newCurrent);
         } else {
            setCurrent(Math.abs(newCurrent));
         }
      };
      drag(document.getElementById("CardDisplay"), callback);

      const init = (e) => {
         if (e.propertyName !== "transform") return;
         let newLeft =
            parseInt(elmnt.style.transform.replace(/[^-.0-9]/g, "")) +
            parseInt(elmnt.style.left.replace(/[^-.0-9]/g, ""));

         const first = fcwidth - lapse;
         const last = fcwidth - lapse * 2 + width;

         if (newLeft <= last - width / 3) {
            newLeft += lapse;
         } else if (newLeft >= first + width / 3) {
            newLeft -= lapse;
         }
         elmnt.style.left = newLeft + "px";
         elmnt.style.transition = "all 0s";
         elmnt.style.transform = `translateX(0px)`;

         setRefresh((prev) => prev + 1);
      };

      elmnt.addEventListener("transitionend", init);
      return () => elmnt.removeEventListener("transitionend", init);
   }, [inputCards.length, width]);

   /*
      changeCurrent : 시간에 따라 위치가 바꼈을 때, current 업데이트
      changeCardByTime : 3초 간격으로 카드를 바꿈.
   */
   useEffect(() => {
      const elmnt = document.getElementById("CardDisplay");

      const changeCurrent = () => {
         let newLeft =
            parseInt(elmnt.style.transform.replace(/[^-.0-9]/g, "")) +
            parseInt(elmnt.style.left.replace(/[^-.0-9]/g, ""));
         const lapse = inputCards.length * width;
         const fcwidth = (window.innerWidth - width) / 2;
         const newCurrent = Math.round((newLeft + lapse - fcwidth) / width);

         if (newCurrent > 0) {
            setCurrent(inputCards.length - newCurrent);
         } else {
            setCurrent(Math.abs(newCurrent));
         }
      };

      const changeCardByTime = setInterval(() => {
         elmnt.style.transition = "all 0.3s";
         elmnt.style.transform = `translateX(-${width}px)`;
         changeCurrent();
      }, 3000);
      return () => clearInterval(changeCardByTime);
   }, [refresh, width, inputCards.length]);

   return (
      <Swiper
         frameColor={swiperStyle.frameColor}
         bgColor={swiperStyle.backgroundColor}
         width={width}
      >
         <span className="frame" />
         <CardDisplay
            draggable
            id="CardDisplay"
            num={inputCards.length}
            fontColor={swiperStyle.fontColor}
            width={width}
            style={{
               left:
                  (window.innerWidth - width) / 2 - inputCards.length * width,
            }}
         >
            {cards.map((card, index) => {
               let className = "";
               if (index === current) className = "current";
               else if (index === inputCards.length + current)
                  className = "current";
               else if (index === inputCards.length * 2 + current)
                  className = "current";
               return (
                  <span key={index} className={className}>
                     <div className="subject">&nbsp;{card.subject || ""}</div>
                     <img src={card.image} alt={`pass img src in ${index}`} />
                     <div className="description">
                        <br />
                        &nbsp;{card.description || ""}
                     </div>
                  </span>
               );
            })}
         </CardDisplay>
      </Swiper>
   );
}
export default ImageSwiper;
