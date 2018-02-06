import { query, remove, update, removeTable } from "../services/profile";

export default {
  namespace: "profile",

  state: {
    
  },

  effects: {
    *loadProfile({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(getProfile, payload);
      debugger
      yield put({
        type: "loadProfileSuccess",
        payload: {
          data
        }
      });
      yield put({ type: "hideLoading" });
    }
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    loadProfileSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state
      };
    }
  }
};
