import { login } from "../services/mobile";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";

export default {
  namespace: "mobile",
  state: {
    login: false,
    user: {
      name: "",
      uid: ""
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      // window.onresize = () => {
      //   dispatch({ type: "changeNavbar" });
      // };
      // if (Cookie.get("SESSION_NP")) {
      //   let temparr = Cookie.get("SESSION_NP");
      //   temparr = atob(temparr);
      //   temparr = temparr.split("###");
      //   dispatch({
      //     type: "app/login",
      //     payload: { name: temparr[0], pass: temparr[1] }
      //   });
      // }
    }
  },
  effects: {
  },
  reducers: {

  }
};
