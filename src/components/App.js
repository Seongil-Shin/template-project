import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Temp from "../routes/Temp";
import TempForSwiper from "../routes/TempForSwiper";
import Temp2 from "../routes/Temp2";
import Login from "../routes/Login";
import Header from "./Header/Header";
import Footer from "./Footer";
import Join from "../routes/Join";

function App() {
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
            <Footer />
         </Router>
      </>
   );
}

export default App;
