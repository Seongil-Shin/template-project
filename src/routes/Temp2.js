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
`;

const Btns = styled.div`
  position:absolute;
  padding: 0 15px 0 15px;

  & > *{
    position:relative;
    width:15px;
    height:15px;
    float:left;
    bottom:50px;
    margin:0 5px 0 5px;
    border-radius:20px;
    border:0;
    outline:0;
    background-color:${(props) => props.theme.color.highlight};
    box-shadow:${(props) => props.theme.boxShadow};
    cursor:pointer
  }
  & >*.clicked{
    background-color:${(props) => props.theme.color.primary};
  }
`;

const Btn = styled.button`
  
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
  customPaging: i => ( //dot customizing
    <div
      id={i}
      style={{background:"#fff",zIndex:"990",position:"absolute",bottom:"10px"}}
    >
      &nbsp;{i}
    </div>
  )
};

function Temp2() {
  const theme = useTheme();  
  const [btn, setBtn] = useState();
  let target;    

  const onClickEvent = (e) => {
    const dotId = e.target.id.replace("btn","")
    document.getElementById(dotId).click();
    for(let i=0;i<target;i++)
      document.getElementById('btns').childNodes[i].className = "unclicked"
    e.target.className = "clicked"
  };

  useEffect(() => {
    target = document.getElementsByClassName('slick-dots')[0].childNodes.length
    for(let i=0;i<target;i++){
      const id="btn"+i
      setBtn((prev) => [prev,<button id={id} onClick={onClickEvent}>&nbsp;</button>]);
    }
    
  }, []);

  return (
    <>
      <Article>
        <DivWrapper>
          <Bannerwrapper>
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
          <Btns id="btns">
            {btn}
        </Btns>
        </DivWrapper>
        
      </Article>
      <MiddleBanner/>
    </>
  );
}
export default Temp2;
