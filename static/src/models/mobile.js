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
    }
  },
  effects: {
  },
  reducers: {
  }
};
