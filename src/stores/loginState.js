import { createReducer } from "@reduxjs/toolkit";

const LOGINED = "LOGINED";
const LOGOUT = "LOGOUT";

export const logined = () => ({ type: LOGINED });
export const logout = () => ({ type: LOGOUT });

const loginReducer = createReducer(
   { isLogined: false },
   {
      [LOGINED]: () => ({ isLogined: true }),
      [LOGOUT]: () => ({ isLogined: false }),
   }
);

export default loginReducer;
