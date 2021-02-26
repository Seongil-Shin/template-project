import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const transition = (time) => {
   return css`
      -webkit-transition: -webkit-transform ${time}s ease-out;
      transition: -webkit-transform ${time}s ease-out;
      transition: transform ${time}s ease-out;
      transition: transform ${time}s ease-out,
         -webkit-transform ${time}s ease-out;
   `;
};
const CardDisplay = styled.div`
   display: table;
   position: relative;
   z-index: 1000;
   width: ${({ num }) => num * 3 * 500}px;
   height: 800px;
   left: ${({ left }) => left}px;

   transform: translateX(${({ xTranslate }) => xTranslate}px);
   -webkit-transform: translateX(${({ xTranslate }) => xTranslate}px);

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
   const [left, setLeft] = useState(
      (window.innerWidth - 500) / 2 - inputCards.length * 500
   );
   const [xTranslate, setXTranslate] = useState(0);
   const [time, setTime] = useState(0.5);

   useEffect(() => {
      setCards([...inputCards, ...inputCards, ...inputCards]);
   }, [inputCards]);

   useEffect(() => {
      const elmnt = document.getElementById("CardDisplay");
      let pos = 0;
      const width = 500;
      const lapseWidth = inputCards.length * width;
      const frontCard = (window.innerWidth - width) / 2;

      const dragMouseDown = (e) => {
         e = e || window.event;
         e.preventDefault();
         pos = e.clientX;
         document.onmouseup = closeDragElement;
         document.onmousemove = elementDrag;
      };
      const elementDrag = (e) => {
         e = e || window.event;
         e.preventDefault();
         elmnt.style.left = left - pos + e.clientX + "px";
      };
      const closeDragElement = (e) => {
         document.onmouseup = null;
         document.onmousemove = null;

         let cur = left - pos + e.clientX;
         let start = frontCard - lapseWidth;
         let end = frontCard - lapseWidth * 2 + width;

         setTime(0.3);
         if (cur > start + 250) {
            cur -= lapseWidth;
            setXTranslate(-((cur - frontCard) % width)); // 오른쪽으로 끌어당김
         } else if (cur <= start + 250 && cur > end - 250) {
            if (left + 250 < cur) {
               setXTranslate(-((cur - frontCard) % width)); // 오른쪽
            } else if (left <= cur && left + 250 >= cur) {
               setXTranslate(-(width + ((cur - frontCard) % width)));
            } else if (left > cur && left - 250 <= cur) {
               setXTranslate(-((cur - frontCard) % width));
            } else if (left - 250 > cur) {
               // 왼쪽
               setXTranslate(-(width + ((cur - frontCard) % width)));
            }
         } else if (cur <= end - 250) {
            cur += lapseWidth;
            setXTranslate(-(width + ((cur - frontCard) % width))); //왼쪽으로 끌어당김
         }

         setLeft(cur);
         elmnt.style.left = cur + "px";
      };

      elmnt.onmousedown = dragMouseDown;
   }, [left, inputCards.length]);

   useEffect(() => {
      const elmnt = document.getElementById("CardDisplay");
      const init = () => {
         const newLeft =
            parseInt(elmnt.style.left.slice(0, elmnt.style.left.length - 2)) +
            xTranslate;
         setLeft(newLeft);
         elmnt.style.left = newLeft + "px";
         setTime(0);
         setXTranslate(0);
      };
      elmnt.addEventListener("transitionend", init);

      return () => {
         elmnt.removeEventListener("transitionend", init);
      };
   }, [xTranslate]);

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
