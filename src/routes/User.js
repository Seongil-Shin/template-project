import React, { useEffect } from "react";
import { connect } from "react-redux";

function User({ history, isLogined }) {
   useEffect(() => {
      if (!isLogined) {
         try {
            history.push("/login");
         } catch {
            history.push("/");
         }
      }
   }, [history, isLogined]);
   return <div></div>;
}

function mapStateToProps(state) {
   return { isLogined: state.loginReducer.isLogined };
}

export default connect(mapStateToProps)(User);
