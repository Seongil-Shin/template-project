import React, { useEffect, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import drag from "../functions/Drag";

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
         height: ${width * 1.3}px;
         border-radius: ${width * 0.1}px;
      `}
   }
`;

//cards 에 image : 주소, subject : 제목, description : 내용 으로 넘김
function ImageSwiper({ inputCards = [], swiperStyle = {} }) {
   const [cards, setCards] = useState([]);

   const [width, setWidth] = useState(500);
   const [refresh, setRefresh] = useState(0);
   const [current, setCurrent] = useState(0);
   const breakPoint = useTheme().size;

   useEffect(() => {
      setCards([...inputCards, ...inputCards, ...inputCards]);
   }, [inputCards]);

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

   useEffect(() => {
      const elmnt = document.getElementById("CardDisplay");
      const callback = (cur, left) => {
         const lapse = inputCards.length * width;
         const fcwidth = (window.innerWidth - width) / 2;
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

         if (pullRight) {
            elmnt.style.transform = `translateX(+${rest}px)`;
         } else {
            elmnt.style.transform = `translateX(${rest - width}px)`; //왼쪽으로 끌어당김
         }
      };
      drag(document.getElementById("CardDisplay"), callback);

      const init = (e) => {
         if (e.propertyName !== "transform") return;
         let newLeft =
            parseInt(elmnt.style.transform.replace(/[^-.0-9]/g, "")) +
            parseInt(elmnt.style.left.replace(/[^-.0-9]/g, ""));

         const lapse = inputCards.length * width;
         const fcwidth = (window.innerWidth - width) / 2;
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
         setCurrent(Math.round(Math.abs((newLeft + lapse - fcwidth) / width)));
      };

      elmnt.addEventListener("transitionend", init);
      return () => elmnt.removeEventListener("transitionend", init);
   }, [inputCards.length, width]);

   useEffect(() => {
      const id = setInterval(() => {
         const elmnt = document.getElementById("CardDisplay").style;
         elmnt.transition = "all 0.3s";
         elmnt.transform = `translateX(-${width}px)`;
      }, 3000);
      return () => clearInterval(id);
   }, [refresh, width]);

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
               const className =
                  index === inputCards.length + current ? "current" : "";
               return (
                  <span key={index} className={className}>
                     <div className="subject">&nbsp;{card.subject}</div>
                     <img src={card.image} alt={`pass img src in ${index}`} />
                     <div className="description">
                        <br />
                        &nbsp;{card.description}
                     </div>
                  </span>
               );
            })}
         </CardDisplay>
      </Swiper>
   );
}
export default ImageSwiper;
