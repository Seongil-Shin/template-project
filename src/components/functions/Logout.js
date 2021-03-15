import axios from "axios";
import { connect } from "react-redux";
import { logined } from "../../stores/loginState";

const Logout = async (onLogined) => {
   console.log(123123);

   await axios
      .post("/users/api/logout")
      .then((res) => {
         console.log(res);
      })
      .catch(() => {
         alert(
            "데이터베이스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
         );
      });
};

function mapDispatchToProps(dispatch) {
   return {
      onLogined: () => dispatch(logined()),
   };
}

export default connect(null, mapDispatchToProps)(Logout);
