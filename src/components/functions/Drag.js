export default function drag(elmnt, callback) {
   let pos = 0,
      firstLeft = 0;

   const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos = e.clientX;
      firstLeft = parseInt(elmnt.style.left.replace(/[^-.0-9]/g, ""));
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
      //마우스를 놨을때가 cur
      const cur = firstLeft - pos + e.clientX;

      callback(cur, firstLeft);
      elmnt.style.left = cur + "px";
   };

   elmnt.onmousedown = dragMouseDown;
}
