import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Slider from "react-slick";
import Contents from "./BannerComponent";

import tmp1 from "../img/tmp1.png";
import tmp2 from "../img/tmp2.jpg";
import tmp3 from "../img/tmp3.jpg";
import tmp4 from "../img/tmp_ceo.jpg";
import mv from "../img/pano.mp4";

const BANNER_HEIGHT = "90vh";

const Bannerwrapper = styled.div`
   width: 100%;

   & .slick-dots {
      //dots style
      bottom: 50px;
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
      color: ${(props) => props.theme.color.white};
   }
`;

const settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   autoplay: true,
   autoplaySpeed: 10000, //(ms)
   pauseOnHover: true,
   arrows: false,
   dots: true,
   //prevArrow : "<button type='button' class='slick-prev'>Previous</button>",		// html 설정 가능
   //nextArrow : "<button type='button' class='slick-next'>Next</button>",
   //dotsClass : "slick-dots",//css class 지정도 지정 가능
};

function Banner() {
   const theme = useTheme();

   useEffect(() => {}, []);

   return (
      <>
         <Bannerwrapper>
            <Slider {...settings}>
               <Contents
                  height={BANNER_HEIGHT}
                  type="1"
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
                  type="2"
                  img={tmp2}
                  video={mv}
                  title="Iz* one me"
                  subTitle="하나가 되는 순간 모두가 주목해"
                  btn="연장하기,투명"
                  colors={
                     theme.color.title +
                     "," +
                     theme.color.secondary +
                     "," +
                     theme.color.primary +
                     "," +
                     theme.color.white
                  }
                  float="right"
                  align="left"
                  link="https://www.youtube.com/watch?v=qrshRevYiiA"
               />
               <Contents
                  height={BANNER_HEIGHT}
                  type="2"
                  img={tmp4}
                  bg={tmp3}
                  title="GUCCI"
                  subTitle="Marchio di lusso italiano"
                  btn="Acquista,투명"
                  colors={
                     theme.color.white +
                     "," +
                     theme.color.gray +
                     "," +
                     theme.color.secondary +
                     "," +
                     theme.color.white
                  }
                  float="left"
                  align="left"
                  filter="blur(5px)"
                  link="/login"
               />
            </Slider>
         </Bannerwrapper>
      </>
   );
}
export default Banner;
