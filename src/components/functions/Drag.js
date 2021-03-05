export default function drag(elmnt, callback) {
   let pos = 0,
      firstLeft = 0;

   const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
      firstLeft = parseInt(elmnt.style.left.replace(/[^-.0-9]/g, ""));
      elmnt.onmouseup = closeDragElement;
      elmnt.ontouchend = closeDragElement;
      elmnt.onmousemove = elementDrag;
      elmnt.ontouchmove = elementDrag;
   };
   const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      elmnt.style.left =
         firstLeft -
         pos +
         (e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0) +
         "px";
   };
   const closeDragElement = (e) => {
      elmnt.onmouseup = null;
      elmnt.onmousemove = null;

      //마우스를 놨을때가 cur
      const cur =
         firstLeft -
         pos +
         (e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0);

      if (firstLeft !== cur) {
         elmnt.style.left = cur + "px";
         callback(cur, firstLeft);
      }
   };

   elmnt.onmousedown = dragMouseDown;
   elmnt.ontouchstart = dragMouseDown;
}
