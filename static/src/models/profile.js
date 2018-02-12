import { profileInfo, upload, profileDetail } from "../services/mobile";
import { parse } from "qs";
import { message } from "antd";
import { routerRedux } from 'dva/router'
import Cookie from "../utils/js.cookie";

export default {
  namespace: "profile",
  state: {
    info: {
      user_id: null,
      name: '',
      status: 0,
      self_photo: '',
      refuse: null
    },
    detail: {
      id: null,
      user_id: null,
      name: '',
      gender: 1,
      card_no: '',
      card_front: '',
      card_back: '',
      card_hold: '',
      self_photo: '',
      protocol: '',
      province: null,
      city: null,
      county: null,
      address: '',
      contact: '',
      tel: '',
      status: 1,
      refuse: null,
      date_created: '',
      date_modify: '',
      protocols: []
    },
    newUpload: {},
  },
  subscriptions: {
    setup({ dispatch }) {
    }
  },
  effects: {
    *getProfileInfo({ payload }, { call, put }) {
      const { userId } = payload;
      if (!userId) {
        yield put(routerRedux.push({
          pathname: '/login'
        }))
        return;
      }
      const data = yield call(profileInfo, payload);
      yield put({
        type: "getProfileInfoSuccess",
        payload: {
          data,
        }
      });
    },
    *uploadFile({ payload }, { call, put }) {
      const data = yield call(upload, payload);
      yield put({
        type: "uploadSuccess",
        payload: {
          data,
          fieldName: payload.fieldName
        }
      });
    },
    *detail({ payload }, { call, put }) {
      const data = yield call(profileDetail, payload);
      yield put({
        type: "getProfileDetailSuccess",
        payload: {
          data,
          fieldName: payload.fieldName
        }
      });
    }
  },
  reducers: {
    getProfileInfoSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state,
        info: actionData.profile
      };
    },
    getProfileDetailSuccess(state, action) {
      const actionData = action.payload.data;
      if (actionData.profile === null) {
        return {
          ...state
        };
      }
      actionData.profile.protocols = [];
      if (actionData.profile.protocol) {
        actionData.profile.protocols = actionData.profile.protocol.split(',');
      }
      return {
        ...state,
        detail: actionData.profile
      };
    },
    uploadSuccess(state, action) {
      const actionData = action.payload.data;
      const urls = {};
      urls[fieldName] = ctionData.url
      return {
        ...state,
        newUpload: urls
      };
    }
  }
};
