import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { transition, transformX } from "../functions/Transition";
import drag from "../functions/Drag";

const CardDisplay = styled.div`
   display: table;
   position: relative;
   z-index: 1000;
   width: ${({ num }) => num * 3 * 500}px;
   height: 800px;
   left: ${({ left }) => left}px;

   ${({ xTranslate }) => transformX(xTranslate)}
   ${({ time }) => transition(time)}

   span {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
   }
   img {
      width: 400px;
      height: auto;
   }
`;

//cards 에 image : 주소, subject : 제목, description : 내용 으로 넘김
function ImageSlide({ inputCards = [] }) {
   const [cards, setCards] = useState([]);

   const [width, setWidth] = useState(500);
   const [frontCardWidth, setFCWidth] = useState(
      (window.innerWidth - width) / 2
   );
   const [left, setLeft] = useState(frontCardWidth - inputCards.length * width);

   const [xTranslate, setXTranslate] = useState(0);
   const [time, setTime] = useState(0.5);
   const [refresh, setRefresh] = useState(0);

   useEffect(() => {
      setCards([...inputCards, ...inputCards, ...inputCards]);
   }, [inputCards]);

   useEffect(() => {
      const callback = (cur) => {
         const lapseWidth = inputCards.length * width;
         const start = frontCardWidth - lapseWidth;
         const end = frontCardWidth - lapseWidth * 2 + width;
         const rest = -((cur - frontCardWidth) % width);
         const wid2 = width / 2;

         setTime(0.3);

         if (cur > start + wid2) {
            setXTranslate(rest); // 오른쪽으로 끌어당김
         } else if (cur <= start + wid2 && cur > end - wid2) {
            if (left + wid2 < cur) {
               setXTranslate(rest);
            } else if (left < cur && left + wid2 >= cur) {
               setXTranslate(rest - width);
            } else if (left > cur && left - wid2 <= cur) {
               setXTranslate(rest);
            } else if (left - wid2 > cur) {
               setXTranslate(rest - width);
            }
         } else if (cur <= end - wid2) {
            setXTranslate(rest - width); //왼쪽으로 끌어당김
         }

         setLeft(cur);
      };
      drag(document.getElementById("CardDisplay"), left, callback);
   }, [left, inputCards.length, frontCardWidth, width]);

   useEffect(() => {
      const elmnt = document.getElementById("CardDisplay");
      let newLeft = left + xTranslate;

      const lapseWidth = inputCards.length * width;
      const frontFirst = frontCardWidth - lapseWidth + width;
      const rearLast = frontCardWidth - lapseWidth * 2;

      const init = () => {
         if (newLeft <= rearLast) {
            newLeft += lapseWidth;
         } else if (newLeft >= frontFirst) {
            newLeft -= +lapseWidth;
         }
         setLeft(newLeft);
         elmnt.style.left = newLeft + "px";
         setTime(0);
         setXTranslate(0);
         setRefresh((prev) => prev + 1);
      };
      elmnt.addEventListener("transitionend", init);

      return () => {
         elmnt.removeEventListener("transitionend", init);
      };
   }, [xTranslate, left, inputCards.length, frontCardWidth, width]);

   useEffect(() => {
      const id = setInterval(() => {
         setTime(0.3);
         setXTranslate(-500);
      }, 5000);
      return () => clearInterval(id);
   }, [refresh]);

   return (
      <CardDisplay
         draggable
         id="CardDisplay"
         num={inputCards.length}
         left={left}
         xTranslate={xTranslate}
         time={time}
      >
         {cards.map((card, index) => {
            return (
               <span key={index}>
                  <img
                     src={card.image}
                     width="400px"
                     alt={`pass img src in ${index}`}
                  />
               </span>
            );
         })}
      </CardDisplay>
   );
}
export default ImageSlide;
