import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import LinearTextGradient from "react-native-text-gradient";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";

const FooterWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.color.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div > div > * {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const FooterLine = styled.div`
  width: 80%;
  max-width: 350px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  & > div {
    float: left;
    height: 100%;
    color: ${(props) => props.theme.color.white};
    text-align: center;
  }
`;

const IconDiv = styled.div`
  min-width: 50px;
  height: 50px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.white};
  margin: 0 15px 20px 15px;

  &:hover {
    color: ${(props) =>
      props.icon === "tw"
        ? "#00ACEE"
        : props.icon === "fb"
        ? "#3b5998"
        : "#211f1f"};
  }
`;

const TextDiv = styled.div`
  min-width: 30px;
  margin: ${(props) => (props.size === "small" ? "10px" : "7px")} 0 0 0;
  &::after {
    position: relative;
    top: 58%;
    transform: translateY(-50%);
    content: "·";
    font-size: 20px;
  }
  &:last-child::after {
    content: "";
  }
  & span,
  a {
    font-size: ${(props) => (props.size === "small" ? props.size : "15px")};
    color: ${(props) =>
      props.size === "small"
        ? props.theme.color.gray
        : props.theme.color.white};
  }
  & a {
    text-decoration: none;
  }
  & a:hover {
    text-decoration: underline;
  }
`;

function Footer() {
  const theme = useTheme();

  useEffect(() => {}, []);

  return (
    <FooterWrapper>
      <FooterLine>
        <IconDiv icon="tw">
          <TwitterIcon />
        </IconDiv>
        <IconDiv icon="ig">
          <InstagramIcon id="ig" />
        </IconDiv>
        <IconDiv icon="fb">
          <FacebookIcon />
        </IconDiv>
        <IconDiv icon="gh">
          <GitHubIcon />
        </IconDiv>
      </FooterLine>
      <FooterLine>
        <TextDiv>
          <a href="">info</a>
        </TextDiv>
        <TextDiv>
          <a href="">support</a>
        </TextDiv>
        <TextDiv>
          <a href="">izone</a>
        </TextDiv>
      </FooterLine>
      <FooterLine>
        <TextDiv>
          <a href="">Term of use</a>
        </TextDiv>
        <TextDiv>
          <a href="">Policy</a>
        </TextDiv>
        <TextDiv>
          <a href="">Privacy</a>
        </TextDiv>
      </FooterLine>
      <FooterLine>
        <TextDiv size="small">
          <span>@2021 izone permanent</span>
        </TextDiv>
      </FooterLine>
      <LinearTextGradient
        style={{ fontWeight: "bold", fontSize: 72 }}
        locations={[0, 1]}
        colors={["red", "blue"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        THIS IS TEXT GRADIENT
      </LinearTextGradient>
      ;
    </FooterWrapper>
  );
}
export default Footer;