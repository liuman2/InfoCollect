import { login } from "../services/mobile";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";

export default {
  namespace: "mobile",
  state: {
    login: false,
    loginUser: {
      id: '',
      mobile: '',
      nick_name: '',
      profileIsFull: false
    },
  },
  subscriptions: {
    setup({ dispatch }) {
    }
  },
  effects: {
    *signin({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(login, payload);
      yield put({
        type: "signinSuccess",
        payload: {
          data,
        }
      });
      yield put({ type: "hideLoading" });
    },
  },
  reducers: {
    signinSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state,
        loginUser: actionData
      };
    }
  }
};
