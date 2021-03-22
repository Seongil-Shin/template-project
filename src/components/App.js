import React, { useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Temp from "../routes/Temp";
import TempForSwiper from "../routes/TempForSwiper";
import Temp2 from "../routes/Temp2";
import Login from "../routes/Login";
import Header from "./Header/Header";
import Footer from "./Footer";
import Join from "../routes/Join";
import User from "../routes/User";
import axios from "axios";
import { connect } from "react-redux";
import { logined } from "../stores/loginState";

function App({ onLogined }) {
   useEffect(() => {
      const rememberMe = async () => {
         console.log(123312);
         await axios
            .get("/users/api/remember-me")
            .then((res) => {
               if (res.data.authenticated) {
                  onLogined();
               }
            })
            .catch((err) => {
               console.log(err);
            });
      };
      rememberMe();
   }, [onLogined]);
   return (
      <>
         <Router>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/header1/:id" component={Temp} />
            <Route exact path="/header2" component={TempForSwiper} />
            <Route exact path="/header3" component={Temp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/join" component={Join} />
            <Route exact path="/test" component={Temp2} />
            <Route exact path="/user" component={User} />
            <Footer />
         </Router>
      </>
   );
}

function mapDispatchToProps(dispatch) {
   return {
      onLogined: () => dispatch(logined()),
   };
}

export default connect(null, mapDispatchToProps)(App);
