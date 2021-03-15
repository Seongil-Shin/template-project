import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logined } from "../../stores/loginState";
import Logout from "../functions/Logout";
import HeaderComponent from "./HeaderComponent";

function Header({ isLogined }) {
   const [links, setLinks] = useState([
      {
         to: "/",
      },
      {
         to: "/header1",
         params: "/param",
      },
      {
         to: "/header2",
         query: "?id=23",
      },
      {
         to: "/header3",
      },
      {
         to: "/login",
      },
      {
         to: "/join",
      },
   ]);
   const [contents, setContents] = useState([
      {
         isImage: true,
         content:
            "https://upload.wikimedia.org/wikipedia/commons/6/63/IZONE_Logo.png",
      },
      {
         content: "header1",
      },
      {
         content: "header2",
      },
      {
         content: "header3",
      },
      {
         content: "login",
      },
      {
         content: "Join",
      },
   ]);
   useEffect(() => {
      const logout = async (onLogined = "123") => {
         console.log(123123);
         /*
         await axios
            .post("/users/api/logout")
            .then((res) => {
               console.log(res);
            })
            .catch(() => {
               alert(
                  "데이터베이스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
               );
            });
            */
      };
      const changeLastTwo = (linkTo1, linkTo2, content1, content2) => {
         setLinks((prev) =>
            prev.map((link, index) => {
               if (index === prev.length - 2) {
                  link.to = linkTo1;
               } else if (index === prev.length - 1) {
                  link.to = linkTo2;
                  link.callback = function () {
                     console.log();
                  };
               }
               logout();
               return link;
            })
         );
         setContents((prev) =>
            prev.map((content, index) => {
               if (index === prev.length - 2) {
                  content.content = content1;
               } else if (index === prev.length - 1) {
                  content.content = content2;
               }
               return content;
            })
         );
      };

      if (isLogined) {
         changeLastTwo("/user", "", "님", "로그아웃");
      } else {
         changeLastTwo("/login", "/join", "login", "Join");
      }
   }, [isLogined]);
   return <HeaderComponent link={links} content={contents} />;
}

function mapStateToProps(state) {
   return { isLogined: state.loginReducer.isLogined };
}
function mapDispatchToProps(dispatch) {
   return {
      onLogined: () => dispatch(logined()),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
