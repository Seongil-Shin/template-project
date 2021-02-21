import React from "react";
import HeaderComponent from "./HeaderComponent";

const links = [
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
];

const contents = [
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
];

function Header() {
   return <HeaderComponent link={links} content={contents} />;
}
export default Header;
