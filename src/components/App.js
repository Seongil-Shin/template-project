import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Temp from "../routes/Temp";
import Header from "./Header/Header";
import { links, contents } from "./Header/HeaderProps";

function App() {
   return (
      <>
         <Router>
            <Header link={links} content={contents} />
            <Route exact path="/" component={Home} />
            <Route path="/header1/:id" component={Temp} />
            <Route exact path="/header2" component={Temp} />
            <Route exact path="/header3" component={Temp} />
            <Route exact path="/login" component={Temp} />
            <Route exact path="/join" component={Temp} />
         </Router>
      </>
   );
}

export default App;
