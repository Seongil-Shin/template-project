import React from "react";
import Fade from "react-reveal/Fade";
import Banner from "../components/Banner";

import MiddleBanner from "../components/MiddleBanner";
import Wrapper from "../components/elements/Wrapper";
import Textarea from "../components/Textarea";
import Title from "../components/elements/Title";
import Text from "../components/elements/Text";
import Card from "../components/Card";

import dummy from "../assets/images/dummy.png";
import Header from "../components/Header";
import Image from "../components/elements/Image";
import Container from "../components/elements/Container";
import Cards from "../components/Cards";

import dummy2 from "../assets/images/dummy2.png";

export default () => (
   <>
      <Banner />
      <Wrapper>
         <Textarea>
            <Title align="center">
               아이즈원
               <br />
               절대 연장해
            </Title>
            <Text align="center">아이즈원 절대 연장해</Text>
         </Textarea>
         <Container>
            <Fade bottom cascade distance="10px">
               <Cards color="gray">
                  <Card align="left" border="primary">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해
                           <br />
                           절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary" color="highlight">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
               </Cards>

               <Cards>
                  <Card align="center" verticalAlign="center" border="primary">
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해
                           <br />
                           절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary" color="secondary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                        </Text>
                     </Textarea>
                  </Card>
               </Cards>
               <Cards color="gray">
                  <Card align="left" border="primary">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해
                           <br />
                           절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary" color="highlight">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
               </Cards>

               <Cards>
                  <Card align="center" verticalAlign="center" border="primary">
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해
                           <br />
                           절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary" color="secondary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                        </Text>
                     </Textarea>
                  </Card>
               </Cards>
               <Cards color="gray">
                  <Card align="left" border="primary">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해
                           <br />
                           절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary" color="highlight">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center">
                     <Image src={dummy} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
               </Cards>

               <Cards>
                  <Card align="center" verticalAlign="center" border="primary">
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해
                           <br />
                           절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary" color="secondary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="center" size="card">
                           아이즈원
                        </Title>
                        <Text align="center">
                           절대 연장해 절대 연장해 절대 연장해
                        </Text>
                     </Textarea>
                  </Card>
                  <Card align="center" border="primary">
                     <Image src={dummy2} />
                     <Textarea>
                        <Title align="left" size="card">
                           아이즈원
                        </Title>
                        <Text align="left">
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                           절대 연장해 절대 연장해 절대 연장해 <br />
                        </Text>
                     </Textarea>
                  </Card>
               </Cards>
            </Fade>
         </Container>
      </Wrapper>
      <MiddleBanner />
   </>
);
