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
      string:
         "https://upload.wikimedia.org/wikipedia/commons/6/63/IZONE_Logo.png",
   },
   {
      string: "header1",
   },
   {
      string: "header2",
   },
   {
      string: "header3",
   },
   {
      string: "login",
   },
   {
      string: "Join",
   },
];

function Header() {
   return <HeaderComponent link={links} content={contents} />;
}
export default Header;
