import axios from "axios";
import React, { useEffect } from "react";

function User({ history }) {
   useEffect(() => {
      const isAuthenticated = async () => {
         await axios
            .get("/users/api/user")
            .then((req) => {
               if (!req.data.authenticated) {
                  history.push("/login");
               }
            })
            .catch((err) => {
               history.push("/");
            });
      };
      isAuthenticated();
   }, [history]);
   return <div></div>;
}
export default User;
