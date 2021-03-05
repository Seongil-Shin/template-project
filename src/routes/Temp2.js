import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Slider from "react-slick";
import Contents from "../components/BannerComponent";
import MiddleBanner from "../components/MiddleBanner";

import tmp1 from "../img/tmp1.png";
import tmp2 from "../img/tmp2.jpg";
import tmp3 from "../img/tmp_ceo.jpg";
import bg from "../img/main_input_bg.png";

import $ from "jquery";
window.$ = $;

const BANNER_HEIGHT = "460px";

const Article = styled.div`
   width: 100%;
   padding-top: 100px;
`;

const DivWrapper = styled.div`
   float: left;
   width: 50%;
   @media ${(props) => props.theme.size.tabletL} {
      width: 100%;
      &#textBox {
         border-top: 5px solid #353535;
      }
   }
`;

const Bannerwrapper = styled.div`
   max-width: 400px;
   width: 90%;
   margin: 0 auto;
   position: relative;
   & .slick-dots {
      //dots style
      position: absolute;
      left: ${(props) => (props.posX > 240 ? props.posX - 240 : 0)}px;
      bottom: 50px;
      z-index: 20;
   }
   & .slick-dots li.slick-active button:before {
      //active dots style
      font-size: 15px;
      opacity: 1;
      color: ${(props) => props.theme.color.highlight};
   }
   & .slick-dots li button:before {
      //inactive dots style
      opacity: 0.75;
      color: ${(props) => props.theme.color.error};
   }
`;

const Img = styled.img`
   width: 100%;
   height: 460px;
   position: absolute;
   z-index: 10;
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
};

function Temp2() {
   const theme = useTheme();
   const [posX, setPosX] = useState();
   let target;
   let target2;

   const getTargetPosition = () => {
      //반응형 하려고 넣은거
      target = document.getElementById("textBox"); // 요소의 id 값이 target이라 가정, dots 위치를 textBox랑 같은 포지션에 두려고 textBox 가져와서 pos에 넣음
      const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
      const relativeLeft = clientRect.left; // Viewport의 시작지점을 기준으로한 상대좌표 X 값.

      target2 = document.getElementById("bannerwrapper");
      const clientRect2 = target2.getBoundingClientRect();
      const relativeLeft2 = clientRect2.left;
      const tbox = document.body.clientWidth;
      if (tbox > 1280) {
         setPosX(relativeLeft);
         document.getElementById("textBox").style.paddingLeft = "0px";
         document.getElementById("textBox").style.width = "50%";
      } else {
         setPosX(0);
         document.getElementById("textBox").style.paddingLeft =
            relativeLeft2 + "px";
         document.getElementById("textBox").style.width =
            tbox - relativeLeft2 + "px";
      }
   };

   const observer = new MutationObserver((mutations, observer) => {
      //왼쪽 슬라이더 이벤트 감지하는 거

      let h1Text = document.getElementsByTagName("h1")[7]; /*슬라이더개수*2+1*/
      let h3Text = document.getElementsByTagName("h3")[7];
      mutations.map((m) =>
         $(m.target)
            .children()
            .filter(function () {
               return $(this).attr("aria-hidden") === "false";
            })[0].attributes[0].value === "0"
            ? (h1Text.innerHTML = "나만의 어시스탄토")
            : $(m.target)
                 .children()
                 .filter(function () {
                    return $(this).attr("aria-hidden") === "false";
                 })[0].attributes[0].value === "1"
            ? (h1Text.innerHTML = "Panorama")
            : (h1Text.innerHTML = "Harry")
      );

      mutations.map((m) =>
         $(m.target)
            .children()
            .filter(function () {
               return $(this).attr("aria-hidden") === "false";
            })[0].attributes[0].value === "0"
            ? (h3Text.innerHTML =
                 "일주일의 바쁜 스케줄도 문제없이.<br/>앱으로 설정한 메모도, 스마트 디바이스로 설정한 알람도<br/>네이버 클로바 앱에서 간편하게 관리해보세요.")
            : $(m.target)
                 .children()
                 .filter(function () {
                    return $(this).attr("aria-hidden") === "false";
                 })[0].attributes[0].value === "1"
            ? (h3Text.innerHTML =
                 "깊은 어둠 속 빛나는 별처럼<br/>우린 어디서든 서로 알아볼 수 있어<br/>눈부신 Spotlight 너와 나 그 맘 속에<br/>영원히 피어날 찬란한 이 순간<br/>Like Like a Panorama")
            : (h3Text.innerHTML = "윙가르디움 레비오우사")
      );
   });

   useEffect(() => {
      getTargetPosition();

      const observe = document.getElementsByClassName("slick-track")[0];
      observer.observe(observe, { attributes: true });

      window.addEventListener("resize", getTargetPosition);
   }, []);

   return (
      <>
         <Article>
            <DivWrapper>
               <Bannerwrapper posX={posX} id="bannerwrapper">
                  <Img src={bg} />
                  <Slider {...settings}>
                     <Contents
                        height={BANNER_HEIGHT}
                        type="mobile"
                        bg={tmp1}
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
                        bg={tmp3}
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
                  title=""
                  subTitle=""
                  colors={theme.color.primary + "," + theme.color.secondary}
               />
            </DivWrapper>
         </Article>
         <MiddleBanner />
      </>
   );
}
export default Temp2;
