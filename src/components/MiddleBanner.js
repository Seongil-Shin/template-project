import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Contents from "./BannerComponent";

import tmp1 from "../img/tmp4.png";

const BANNER_HEIGHT = "30vh"; // banner height

const Bannerwrapper = styled.div`
  height: ${BANNER_HEIGHT};
  width: 100%;
  & .react-parallax-content {
    height: ${BANNER_HEIGHT};
  }
`;

function MiddleBanner() {
  const theme = useTheme();

  useEffect(() => {}, []);

  return (
    <>
      <Bannerwrapper>
        <Contents
          type="banner"
          bg={tmp1}
          title="The EndGame"
          subTitle="Infinity saga Phase 3"
          btn="보러가기,투명"
          colors={
            theme.color.white +
            "," +
            theme.color.white +
            "," +
            theme.color.white +
            "," +
            theme.color.white
          } //title,subtitle,button-background,button
          link="https://www.youtube.com/watch?v=ijUsSpRVhBU"
        />
      </Bannerwrapper>
    </>
  );
}
export default MiddleBanner;
