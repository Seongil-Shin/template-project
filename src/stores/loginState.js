import { createReducer } from "@reduxjs/toolkit";

const LOGINED = "LOGINED";
const LOGOUT = "LOGOUT";

export const logined = (username) => ({ type: LOGINED, username });

export const logout = () => ({ type: LOGOUT });

const loginReducer = createReducer(
   { isLogined: false, username: "" },
   {
      [LOGINED]: (state, action) => ({
         isLogined: true,
         username: action.username,
      }),
      [LOGOUT]: () => ({ isLogined: false }),
   }
);

export default loginReducer;
