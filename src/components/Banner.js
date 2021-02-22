import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import SliderContents from "./Slider";
import bannerImg from "../img/main.jpg";
import bannerImg2 from "../img/t2.jpg";
import bannerImg3 from "../img/1.jpg";
import bannerImg4 from "../img/ceo.jpg";

const Bannerwrapper = styled.div`
  height: 90vh;
  width: 100%;
  & .slick-dots {
    bottom:0px
  }
  & .slick-dots li.slick-active button:before{
    font-size:15px;
    opacity: 1;
    color: #ffffff;
  }
  & .slick-dots li button:before{
    opacity: 0.75;
    color: #bdbdbd;
  }
  }
`;

var settings = {
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
  //prevArrow : "<button type='button' class='slick-prev'>Previous</button>",		// 이렇게 디자인 html 임의 설정 가능
  //nextArrow : "<button type='button' class='slick-next'>Next</button>",	
  //dotsClass : "slick-dots",//css class 지정도 지정 가능
};

function Banner(props) {
  useEffect(() => {}, []);

  return (
    <>
      <Bannerwrapper>
        <Slider {...settings} class="slidrWrapper">
          <SliderContents
            type="1"
            bg={bannerImg}
            title="The EndGame"
            subTitle="Infinity saga Phase 3"
            btn="보러가기,불투명"
            colors="#FCFDFF,#B8C7E2,#DE99AB,#FFFFFF" //title,subtitle,button-background,button
          />
          <SliderContents
            type="2"
            img={bannerImg2}            
            title="Iz* one me"
            subTitle="하나가 되는 순간 모두가 주목해"
            btn="연장하기,투명"
            colors="#1A4188,#DE99AB,#86A8E7,#FFFFFF"
            float="right"
            align="left"
          />
          <SliderContents
            type="3"
            img={bannerImg4}
            bg={bannerImg3}
            title="GEVO"
            subTitle="친환경주 대장"
            btn="매수,투명"
            colors="#FCFDFF,#7F7FD5,#DE99AB,#FFFFFF"
            float="left"
            align="left"
            filter="blur(5px)"
          />
        </Slider>
      </Bannerwrapper>
    </>
  );
}
export default Banner;
