import axios from "axios";

const Logout = async () => {
   console.log("yes im on");
   await axios
      .post("/users/api/logout")
      .then((res) => {
         if (res.data.logout) {
            const event = new Event("logout");
            document.dispatchEvent(event);
         }
      })
      .catch(() => {
         alert(
            "데이터베이스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
         );
      });
};

export default Logout;
