import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Temp from "../routes/Temp";
import Temp2 from "../routes/Temp2";
import Header from "./Header/Header";

function App() {
   return (
      <>
         <Router>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/header1/:id" component={Temp} />
            <Route exact path="/header2" component={Temp} />
            <Route exact path="/header3" component={Temp} />
            <Route exact path="/login" component={Temp} />
            <Route exact path="/join" component={Temp} />
            <Route exact path="/test" component={Temp2} />
         </Router>
      </>
   );
}

export default App;
