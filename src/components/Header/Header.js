import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../stores/loginState";
import Logout from "../functions/Logout";
import HeaderComponent from "./HeaderComponent";

function Header({ isLogined, onLogout, username }) {
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
      const changeLastTwo = (linkTo1, linkTo2, content1, content2) => {
         setLinks((prev) =>
            prev.map((link, index) => {
               if (index === prev.length - 2) {
                  link.to = linkTo1;
               } else if (index === prev.length - 1) {
                  link.to = linkTo2;
                  if (linkTo2 === "") {
                     link.callback = Logout;
                  } else {
                     link.callback = () => {};
                  }
               }
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
         changeLastTwo("/user", "", `${username} 님`, "로그아웃");
      } else {
         changeLastTwo("/login", "/join", "login", "Join");
      }
      document.addEventListener("logout", onLogout);
      return () => document.removeEventListener("logout", onLogout);
   }, [isLogined, onLogout, username]);

   return <HeaderComponent id="Header" link={links} content={contents} />;
}

function mapStateToProps(state) {
   return {
      isLogined: state.loginReducer.isLogined,
      username: state.loginReducer.username,
   };
}
function mapDispatchToProps(dispatch) {
   return {
      onLogout: () => dispatch(logout()),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
