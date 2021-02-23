import React from "react";
import LinkButton from "../components/elements/LinkButton";
export default function Temp({ match, location }) {
   // console.log("match", match);
   // console.log("location", location);

   return (
      <div>
         임시 화면입니다.
         <LinkButton to="/header2" />
      </div>
   );
}
