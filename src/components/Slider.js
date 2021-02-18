import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import styled from "styled-components";

const Slider = styled.h1`
  & .react-parallax-bgimage {
    filter: ${(props) => props.filter} !important;
  }

  & .react-parallax {
    width: 100%;
    height: 100%;
    background: ${(props) => (props.bgImage ? "" : "transparent linear-gradient(180deg, #7f7fd5 0%, #86a8e7 49%, #91eae4 100%) 0% 0% no-repeat padding-box")} 
    
  }
  & .react-parallax-content {
    height: 90vh;

    padding: 30px;
  }
  & .react-parallax-content button {
    margin-top: 120px;
  }
  & .react-parallax-bgimage {
    
  }
`;
const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
`;
const TextWrapper = styled.div`
  float: ${(props) => props.float};
  width: ${(props) => props.width-2}%;  
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1%;

  & > * {
    margin-left:${(props) => props.float === "left" && "50px"} !important

    @media ${(props) => props.theme.size.mobileL} {
      margin-left:${(props) => props.float === "left" && "0px"} !important
    }
  }

  @media ${(props) => props.theme.size.tabletS} {
    width: ${(props) => props.width < 60 ? "58" : props.width-2}%;
  }
  @media ${(props) => props.theme.size.mobileL} {
    width: ${(props) => props.width < 70 ? "88" : props.width-2}%;
    padding: 6%;
    margin-left:${(props) => props.float === "left" && "0px"} !important
  }
`;

const ImgWrapper = styled.div`
  float: ${(props) => props.float};
  width: ${(props) => 98-props.width}%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1%;

  @media ${(props) => props.theme.size.tabletS} {
    width: ${(props) => props.width < 60 ? "38" : 98-props.width}%;
  }
  @media ${(props) => props.theme.size.mobileL} {
    display:none
  }
`;

const Title = styled.h1`
  font-size: ${(props) => (props.fontSize === "big" ? "80px" : "60px")};
  font-weight: 600;
  margin-bottom: 20px;
  color: ${(props) => props.color};
  text-align: ${(props) => props.align};

  @media ${(props) => props.theme.size.tabletL} {
    font-size: ${(props) => (props.fontSize === "big" ? "80px" : "45px")};
  }
  @media ${(props) => props.theme.size.tabletS} {
    font-size: ${(props) => (props.fontSize === "big" ? "65px" : "35px")};
  }
  @media ${(props) => props.theme.size.mobileL} {
    font-size: ${(props) => (props.fontSize === "big" ? "50px" : "30px")};
  }
  @media ${(props) => props.theme.size.mobileS} {
    font-size: ${(props) => (props.fontSize === "big" ? "40px" : "30px")};
  }
`;

const Subtitle = styled.h3`
  font-size: ${(props) => (props.fontSize === "big" ? "60px" : "45px")};
  color: ${(props) => props.color};
  text-align: ${(props) => props.align};

  @media ${(props) => props.theme.size.tabletL} {
    font-size: ${(props) => (props.fontSize === "big" ? "60px" : "35px")};
  }
  @media ${(props) => props.theme.size.tabletS} {
    font-size: ${(props) => (props.fontSize === "big" ? "50px" : "30px")};
  }
  @media ${(props) => props.theme.size.mobileL} {
    font-size: ${(props) => (props.fontSize === "big" ? "40px" : "27px")};
  }
  @media ${(props) => props.theme.size.mobileS} {
    font-size: ${(props) => (props.fontSize === "big" ? "35px" : "22px")};
  }
`;

const Button = styled.button`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.fontSize === "big" ? "25px" : "20px")};
  background-color: ${(props) => props.opacity === "불투명" ? props.bg : "rgba( 255, 255, 255, 0 )"};
  width: 150px;
  height: 60px;
  margin: ${(props) => (props.align === "center" ? "0 auto" : "0")};
  border: 0;
  border-radius: 25px;
  border: 2px solid ${(props) => props.bg};
`;

const Img = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 350px;
`;

function SliderWrapper(props) {
  
    const def = {
        width: "100",
        fontSize: "big",
        align: "center"
      };

    const type1 = {
        width: "100",
        bg: props.bg,
        fontSize: "big",
        align: "center",
        img: ""
    };
    
    const type2 = {
        width: "50",
        bg: "",
        fontSize: "middle",
        align: props.align,
        img: props.img,
        float: props.float
    };
    
    const type3 = {
        width: "50",
        bg: props.bg,
        fontSize: "middle",
        align: props.align,
        img: props.img,
        float: props.float
    };

    const [types, setTypes] = useState(def);

    useEffect(() => {
        setTypes(eval("type" + props.type));
    }, []);

    return (
        <Slider filter={props.filter} bgImage={types.bg}>
          <Parallax bgImage={types.bg} strength={800}>
              <ContentWrapper>
                <TextWrapper width={types.width} float={types.float}>
                  <Title
                      fontSize={types.fontSize}
                      align={types.align}
                      color={props.colors.split(",")[0]}
                  >
                      {props.title}
                  </Title>
                  <Subtitle
                      fontSize={types.fontSize}
                      align={types.align}
                      color={props.colors.split(",")[1]}
                  >
                      {props.subTitle}
                  </Subtitle>
                  <Button
                      fontSize={types.fontSize}
                      align={types.align}
                      bg={props.colors.split(",")[2]}
                      color={props.colors.split(",")[3]}
                      opacity={props.btn.split(',')[1]}
                  >
                      {props.btn.split(',')[0]}
                  </Button>
                </TextWrapper>
                <ImgWrapper width={types.width} float={types.float}>
                  <Img src={types.img} />
                </ImgWrapper>
              </ContentWrapper>
          </Parallax>
        </Slider>
    );
}
export default SliderWrapper;
