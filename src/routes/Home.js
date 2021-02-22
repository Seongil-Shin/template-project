import React from "react";
import Banner from "../components/Banner";
<<<<<<< HEAD

export default () => (
   <>
      <Banner />
   </>
);
=======
import Header from "../components/Header";
import Wrapper from "../components/elements/Wrapper"
import Textarea from "../components/Textarea"
import Title from "../components/elements/Title"
import Text from "../components/elements/Text"
import Card from "../components/Card"

import dummy from '../assets/images/dummy.png'

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
        <Card align="center" border="primary">
          <img src={dummy} />
          <Textarea align="center">
            <Title align="center" size="card">
              아이즈원
            </Title>
            <Text align="center">
              절대 연장해 절대 연장해 절대 연장해
            </Text>
          </Textarea>
        </Card>
      </Wrapper>
    </>
  );
>>>>>>> feature/3
