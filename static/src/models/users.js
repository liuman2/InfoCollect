import { query, remove, update, removeTable } from "../services/users";

export default {
  namespace: "users",

  state: {
    list: [],
    selectedRowKeys: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0
    }
  },

  effects: {
    *loadUsers({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      payload.sortField = "id";
      payload.sortOrder = "desc";
      const data = yield call(query, payload);
      yield put({
        type: "loadUsersSuccess",
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize,
          keyword: payload.keyword || '',
        }
      });
      yield put({ type: "hideLoading" });
      yield put({ type: "selectedRowKeys", payload: { selectedRowKeys: [] } });
    },

    *removeUsers({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const data = yield call(remove, payload);
      console.log("delete payload", payload);
      const tableData = yield call(removeTable, payload);
      if (data && data.success) {
        yield put({
          type: "loadUser",
          payload: {
            page: 1,
            pageSize: 20
          }
        });
      } else {
        yield put({ type: "hideLoading" });
      }
    },

    *updateUsers({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const page = payload.page;
      const pageSize = payload.pageSize;

      delete payload.page;
      delete payload.pageSize;

      const data = yield call(update, payload);

      if (data && data.success) {
        yield put({
          type: "loadUsers",
          payload: {
            page: page,
            pageSize: pageSize
          }
        });
      } else {
        yield put({ type: "hideLoading" });
      }
    }
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    selectedRowKeys(state, action) {
      return { ...state, selectedRowKeys: action.payload.selectedRowKeys };
    },
    loadUsersSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state,
        list: actionData.record,
        selectedRowKeys: [],
        pagination: {
          current: action.payload.current,
          pageSize: action.payload.pageSize,
          total: actionData.totalRecord || 0
        }
      };
    }
  }
};
