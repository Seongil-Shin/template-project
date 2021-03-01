export default function drag(elmnt, callback) {
   let pos = 0,
      firstLeft = 0;

   const dragMouseDown = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos = e.clientX || e.changedTouches[0].clientX;
      firstLeft = parseInt(elmnt.style.left.replace(/[^-.0-9]/g, ""));
      elmnt.onmouseup = closeDragElement;
      elmnt.ontouchend = closeDragElement;
      elmnt.onmousemove = elementDrag;
      elmnt.ontouchmove = elementDrag;
   };
   const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      console.log("ada");
      elmnt.style.left =
         firstLeft - pos + (e.clientX || e.changedTouches[0].clientX) + "px";
   };
   const closeDragElement = (e) => {
      elmnt.onmouseup = null;
      elmnt.onmousemove = null;
      console.log(e.changedTouches);
      //마우스를 놨을때가 cur
      const cur = firstLeft - pos + (e.clientX || e.changedTouches[0].clientX);

      callback(cur, firstLeft);
      elmnt.style.left = cur + "px";
   };

   elmnt.onmousedown = dragMouseDown;
   elmnt.ontouchstart = dragMouseDown;
}
