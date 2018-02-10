import { login, profileInfo } from "../services/mobile";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";

export default {
  namespace: "lxhApp",
  state: {
    login: false,
    loginUser: {
      id: '',
      mobile: '',
      nick_name: '',
      profileIsFull: false
    }
  },
  subscriptions: {
    setup({ dispatch }) {
    }
  },
  effects: {
    *signin({ payload }, { call, put }) {
      const data = yield call(login, payload);
      yield put({
        type: "signinSuccess",
        payload: {
          data,
        }
      });
    },
    *getProfileInfo({ payload }, { call, put }) {
      const data = yield call(profileInfo, payload);
      yield put({
        type: "getProfileInfoSuccess",
        payload: {
          data,
        }
      });
    }
  },
  reducers: {
    signinSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state,
        login: true,
        loginUser: actionData
      };
    }
  }
};
