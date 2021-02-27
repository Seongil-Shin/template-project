import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { transition, transformX } from "../functions/Transition";
import drag from "../functions/Drag";

const CardDisplay = styled.div`
   display: table;
   position: relative;
   z-index: 1000;
   width: ${({ num }) => num * 3 * 500}px;
   height: 800px;

   ${({ xTranslate }) => transformX(xTranslate)}
   ${({ time }) => transition(time)}
   ${({ theme }) => css`
      color: ${theme.color.white || "#FCFDFF"};
      font-family: ${theme.font.bold};
   `}

   div {
      opacity: 0.1;
      margin: 40px 0;
   }
   span {
      display: table-cell;
      vertical-align: middle;
      padding: 0 50px;
      opacity: 0.3;
      width: 500px;
   }
   span.current {
      opacity: 1;
      div {
         transition: all 0.3s;
         opacity: 1;
      }
      div.subject {
         font-size: 40px;
      }
      div.description {
         font-size: 30px;
      }
   }
   img {
      top: 400px;
      width: 400px;
      height: auto;
   }
`;

const Swiper = styled.div`
   position: relative;
   span.frame {
      display: inline-block;
      position: absolute;
      left: ${({ frontCardWidth }) => frontCardWidth}px;
      width: 500px;
      height: 800px;
      z-index: 0;
      background-color: ${({ theme }) => theme.color.gray || "#B8C7E2"};
      border-radius: 100px;
   }
`;

//cards 에 image : 주소, subject : 제목, description : 내용 으로 넘김
function ImageSwiper({ inputCards = [] }) {
   const [cards, setCards] = useState([]);

   const [width, setWidth] = useState(500);
   const [frontCardWidth, setFCWidth] = useState(
      (window.innerWidth - width) / 2
   );
   const [xTranslate, setXTranslate] = useState(0);
   const [time, setTime] = useState(0.5);
   const [refresh, setRefresh] = useState(0);
   const [current, setCurrent] = useState(0);

   useEffect(() => {
      setCards([...inputCards, ...inputCards, ...inputCards]);
   }, [inputCards]);

   useEffect(() => {
      const callback = (cur, left) => {
         const lapse = inputCards.length * width;
         const start = frontCardWidth - lapse;
         const end = frontCardWidth - lapse * 2 + width;
         const rest = -((cur - frontCardWidth) % width);
         const wid2 = width / 2;

         setTime(0.2);
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
            setXTranslate(rest);
         } else {
            setXTranslate(rest - width); //왼쪽으로 끌어당김
         }
      };
      drag(document.getElementById("CardDisplay"), callback);
   }, [inputCards.length, frontCardWidth, width]);

   useEffect(() => {
      const elmnt = document.getElementById("CardDisplay");
      const init = () => {
         let newLeft =
            xTranslate - parseInt(elmnt.style.left.replace(/[^0-9]/g, ""));

         const lapse = inputCards.length * width;
         const frontFirst = frontCardWidth - lapse + width;
         const rearLast = frontCardWidth - lapse * 2;

         if (newLeft <= rearLast) {
            newLeft += lapse;
         } else if (newLeft >= frontFirst) {
            newLeft -= +lapse;
         }
         elmnt.style.left = newLeft + "px";
         setTime(0);
         setXTranslate(0);
         setRefresh((prev) => prev + 1);
         setCurrent(Math.abs((newLeft + lapse - frontCardWidth) / width));
      };

      elmnt.addEventListener("transitionend", init);
      return () => elmnt.removeEventListener("transitionend", init);
   }, [xTranslate, inputCards.length, frontCardWidth, width]);

   useEffect(() => {
      const id = setInterval(() => {
         setTime(0.2);
         setXTranslate(-500);
      }, 5000);
      return () => clearInterval(id);
   }, [refresh]);

   return (
      <Swiper frontCardWidth={frontCardWidth}>
         <span className="frame" />
         <CardDisplay
            draggable
            id="CardDisplay"
            num={inputCards.length}
            xTranslate={xTranslate}
            time={time}
            style={{ left: frontCardWidth - inputCards.length * width }}
         >
            {cards.map((card, index) => {
               const className =
                  index === inputCards.length + current ? "current" : "";
               return (
                  <span key={index} className={className}>
                     <div className="subject">&nbsp;{card.subject}</div>
                     <img
                        src={card.image}
                        width="400px"
                        alt={`pass img src in ${index}`}
                     />
                     <div className="description">&nbsp;{card.description}</div>
                  </span>
               );
            })}
         </CardDisplay>
      </Swiper>
   );
}
export default ImageSwiper;
