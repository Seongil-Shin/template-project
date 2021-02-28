import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Slider from "react-slick";
import Contents from "../components/BannerComponent";
import MiddleBanner from "../components/MiddleBanner";

import tmp1 from "../img/tmp1.png";
import tmp2 from "../img/tmp2.jpg";
import bg from "../img/main_input_bg.png";

const BANNER_HEIGHT = "460px";

const Article = styled.div`
  width:100%;  
  margin-top:100px;
`;

const Bannerwrapper = styled.div`
  width: 400px;
  position:relative;
  left:100px;
  float:left;
  & .slick-dots { //dots style
    position:absolute;
    left:${(props) => props.posX-240}px;
    bottom: 50px;    
    z-index:20
  }
  & .slick-dots li.slick-active button:before { //active dots style
    font-size: 15px;
    opacity: 1;
    color: ${(props) => props.theme.color.highlight};
  }
  & .slick-dots li button:before { //inactive dots style
    opacity: 0.75;
    color: ${(props) => props.theme.color.error};
  }
`;

const DivWrapper = styled.div`
  float:left;
  width:50%;
`;
const Img = styled.img`
  position:absolute;
  z-index:10;
  -webkit-user-drag: none;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, //(ms)
  pauseOnHover: true,
  arrows: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        width: "30px",
        color: "blue",
        border: "1px blue solid"
      }}
    >
      &nbsp;
    </div>
  )
};

function Temp2() {
  const theme = useTheme();
  const [posX, setPosX] = useState();
  let target;    

  const getTargetPosition = () => {
    target = document.getElementById('textBox'); // 요소의 id 값이 target이라 가정
    const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)    
    const relativeLeft = clientRect.left; // Viewport의 시작지점을 기준으로한 상대좌표 X 값.

    setPosX(relativeLeft)
  };

  useEffect(() => {
    target = document.getElementById('textBox'); // 요소의 id 값이 target이라 가정
    const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)    
    const relativeLeft = clientRect.left; // Viewport의 시작지점을 기준으로한 상대좌표 X 값.
  
    setPosX(relativeLeft)
    
    window.addEventListener("resize", getTargetPosition);    
  }, []);

  return (
    <>
      <Article>
        <DivWrapper>
          <Bannerwrapper posX={posX}>
            <Img src={bg}/>
            <Slider {...settings} >
              <Contents
                height={BANNER_HEIGHT}
                type="mobile"
                bg={tmp1}
                title="와우 친구들"
                subTitle="빡빡이 아조씨야"
                btn="보러가기,불투명"
                colors={
                  theme.color.white +
                  "," +
                  theme.color.gray +
                  "," +
                  theme.color.secondary +
                  "," +
                  theme.color.white
                } //title,subtitle,button-background,button
                link="/login"
              />
              <Contents
                height={BANNER_HEIGHT}
                type="mobile"
                bg={tmp2}
                title="Iz* one me"
                subTitle="하나가 되는 순간 모두가 주목해"
                btn="연장하기,투명"
                colors={
                  theme.color.white +
                  "," +
                  theme.color.secondary +
                  "," +
                  theme.color.primary +
                  "," +
                  theme.color.white
                }
                link="https://www.youtube.com/watch?v=qrshRevYiiA"
              />
              <Contents
                height={BANNER_HEIGHT}
                type="mobile"
                bg={tmp1}
                title="Iz* one me"
                subTitle="하나가 되는 순간 모두가 주목해"
                btn="연장하기,투명"
                colors={
                  theme.color.white +
                  "," +
                  theme.color.secondary +
                  "," +
                  theme.color.primary +
                  "," +
                  theme.color.white
                }

                link="https://www.youtube.com/watch?v=qrshRevYiiA"
              />
            </Slider>
          </Bannerwrapper>
        </DivWrapper>
        <DivWrapper id="textBox">
          <Contents
            height={BANNER_HEIGHT}
            type="2"
            title="Iz* one me"
            subTitle="하나가 되는 순간 모두가 주목해"
            colors={
              theme.color.primary +
              "," +
              theme.color.secondary
            }
          />
        </DivWrapper>
      </Article>
      <MiddleBanner/>
    </>
  );
}
export default Temp2;
