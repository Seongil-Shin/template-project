export default function drag(elmnt, left, callback) {
   let pos = 0,
      firstLeft = left;

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
      elmnt.style.left = firstLeft - pos + e.clientX + "px";
   };
   const closeDragElement = (e) => {
      document.onmouseup = null;
      document.onmousemove = null;
      const cur = firstLeft - pos + e.clientX;
      callback(cur);
      elmnt.style.left = cur + "px";
   };

   elmnt.onmousedown = dragMouseDown;
}
