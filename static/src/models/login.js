import { login } from "../services/mobile";
import { parse } from "qs";
import { message } from "antd";
import { routerRedux } from 'dva/router'
import Cookie from "../utils/js.cookie";

export default {
  namespace: "login",
  state: {
    id: '',
    mobile: '',
    nick_name: '',
    profileIsFull: false
  },
  subscriptions: {
    setup({ dispatch }) {
    }
  },
  effects: {
    *signin({ payload }, { call, put }) {
      const data = yield call(login, payload);
      if (data.response && data.response.data !== 200) {
        return;
      }
      yield put({
        type: "signinSuccess",
        payload: {
          data,
        }
      });
      yield put(routerRedux.push({
        pathname: '/profile',
      }))
    }
  },
  reducers: {
    signinSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state,
        id: actionData.id,
        mobile: actionData.mobile,
        nick_name: actionData.nick_name,
        profileIsFull: actionData.profileIsFull,
      };
    }
  }
};
