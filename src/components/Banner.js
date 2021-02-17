import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import SliderContents from "./Slider";
import bannerImg from "../img/main.jpg";
import bannerImg2 from "../img/t2.jpg";
import bannerImg3 from "../img/1.jpg";

const Bannerwrapper = styled.div`
  height: 90vh;
  width: 100%;

  & .react-parallax {
    width: 100%;
    height: 100%;
    background: transparent
      linear-gradient(180deg, #7f7fd5 0%, #86a8e7 49%, #91eae4 100%) 0% 0%
      no-repeat padding-box;
  }
  & .react-parallax-content {
    height: 90vh;

    padding: 30px;
  }
  & .react-parallax-content button {
    margin-top: 120px;
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
  arrows: false
};

function Banner() {
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
            btn="보러가기"
            colors="#FCFDFF,#7F7FD5,#DE99AB,#ffffff" //title,subtitle,button-background,button
          />
          <SliderContents
            type="2"
            bg={bannerImg2}
            title="Iz* one me"
            subTitle="하나가 되는 순간 모두가 주목해"
            btn="연장하기"
            colors="#1A4188,#DE99AB,#86A8E7,#ffffff"
            float="right"
            align="left"
          />
          <SliderContents
            type="3"
            bg={bannerImg3}
            title="GEVO"
            subTitle="바이든-친환경주 대장"
            btn="매수"
            colors="#FCFDFF,#7F7FD5,#DE99AB,#ffffff"
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
