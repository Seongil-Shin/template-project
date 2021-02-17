import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import styled from "styled-components";

const Slider = styled.h1`
  & .react-parallax-bgimage {
    filter: ${(props) => props.filter} !important;
  }
`;

const TextWrapper = styled.div`
  float: ${(props) => props.float};
  width: ${(props) => props.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.fontSize === "big" ? "100px" : "50px")};
  font-weight: 600;
  margin-bottom: 20px;
  color: ${(props) => props.color};
  text-align: ${(props) => props.align};
`;

const Subtitle = styled.h3`
  font-size: ${(props) => (props.fontSize === "big" ? "60px" : "30px")};
  color: ${(props) => props.color};
  text-align: ${(props) => props.align};
`;

const Button = styled.button`
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  color: ${(props) => props.color};
  font-size: ${(props) => (props.fontSize === "big" ? "25px" : "20px")};
  background-color: ${(props) => props.bg};
  width: 150px;
  height: 60px;
  margin: ${(props) => (props.align === "center" ? "0 auto" : "0")};
  border: 0;
  border-radius: 15px;
`;

const Img = styled.img`
  position: relative;
  left: 25%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 350px;
`;

function SliderWrapper(props) {
  
    const def = {
        width: "100%",
        fontSize: "big",
        align: "center"
      };

    const type1 = {
        width: "100%",
        bg: props.bg,
        fontSize: "big",
        align: "center",
        img: ""
    };
    
    const type2 = {
        width: "50%",
        bg: "",
        fontSize: "middle",
        align: props.align,
        img: props.bg,
        float: props.float
    };
    
    const type3 = {
        width: "50%",
        bg: props.bg,
        fontSize: "middle",
        align: props.align,
        img: props.bg,
        float: props.float
    };

    const [types, setTypes] = useState(def);

    useEffect(() => {
        setTypes(eval("type" + props.type));
    }, []);

    return (
        <Slider filter={props.filter}>
        <Parallax bgImage={types.bg} strength={800}>
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
            >
                {props.btn}
            </Button>
            </TextWrapper>
            <Img src={types.img} />
        </Parallax>
        </Slider>
    );
}
export default SliderWrapper;
