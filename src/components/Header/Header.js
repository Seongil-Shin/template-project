import React, { useEffect, useState } from "react";
import { LinkButton } from "../elements/LinkButton";
import styled from "styled-components";

const StyledHeader = styled.div`
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   background: #fcfdff 0% 0% no-repeat padding-box;
   box-shadow: 0px 3px 6px #00000029;
   opacity: 1;
   padding-left: 10%;
   padding-right: 10%;

   /* 넘칠 시 옆으로 스크롤하되, 스크롤은 숨기기*/
   overflow: scroll;
   white-space: nowrap;

   -ms-overflow-style: none; /* IE and Edge */
   scrollbar-width: none; /* Firefox */
   &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
   }
`;

export default function Header({
   link = [{ path: "/" }],
   content = [{ string: "pass a content" }],
   headerWidth = "100%",
   headerHeight = "64px",
   buttonStyle = { color: "#4F75BB", fontSize: "14px" },
   putRight = 2,
}) {
   const [paths, setPaths] = useState([]);
   const [contents, setContents] = useState([]);

   useEffect(() => {
      setPaths(link);
      setContents(content);
   }, [link, content]);

   return (
      <StyledHeader width={headerWidth} height={headerHeight}>
         {paths.map((path, index) => {
            const isRight = paths.length - index <= putRight;

            return (
               <LinkButton
                  key={index}
                  {...path}
                  {...contents[index]}
                  buttonStyle={{
                     width: index === 0 || isRight ? "100px" : "200px", // 적절한 넓이로 지정.
                     height: headerHeight,
                     ...buttonStyle,
                     on: isRight ? true : false, // on만 조작하면 됨,
                  }}
               />
            );
         })}
      </StyledHeader>
   );
}
