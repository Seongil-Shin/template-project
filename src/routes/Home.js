import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Wrapper from "../components/elements/Wrapper"
import Textarea from "../components/Textarea"
import Title from "../components/elements/Title"
import Text from "../components/elements/Text"

export default () => (
    <>
      <Header />
      <Banner />
      <Wrapper>
        <Textarea align="center">
          <Title align="center">
            아이즈원<br />절대 연장해
          </Title>
          <Text align="center">
            아이즈원
            절대
            연장해
          </Text>
        </Textarea>
      </Wrapper>
    </>
  );