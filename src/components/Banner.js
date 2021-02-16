  
import React, { useState, useEffect } from 'react'
import { Parallax } from 'react-parallax';
import styled from 'styled-components';
import bannerImg from "../img/main.jpg";

const Bannerwrapper = styled.header`  
  height: 90vh;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  aLign-items: center;
  width: 100%;

  & > .react-parallax {
    width:100%;
    height:100%
  }
`;

const Title = styled.h1`
  font-size: ${props => props.fontSize === "big" ? '100px' : '50px'};
  font-weight: 600;
  margin-top: 300px;
  margin-bottom: 20px;
  color:${props => props.color};
  text-align: ${props => props.align};
`;

const Subtitle = styled.h3`
font-size: ${props => props.fontSize === "big" ? '60px' : '30px'};
color:${props => props.color};
text-align: ${props => props.align};
`;

function Banner() {

  useEffect(() => {
    
  },[])
  
  return (
    <>
      <Bannerwrapper>
          <Parallax bgImage={bannerImg} strength={800}>
              <Title fontSize="big" align="center" color="#ffffff"> Type1 </Title>
              <Subtitle fontSize="big" align="center" color="#ffffff">Type1_1</Subtitle>
          </Parallax>
      </Bannerwrapper>
      
    </>
  );
};
  export default Banner;