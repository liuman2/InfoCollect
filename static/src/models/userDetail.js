import {
	loadProfile,
	passProfile,
	refuseProfile,
	queryContact,
	queryLoginLog,

	update,
	save,
	uploadImage,
	addTable,
	updateTable
} from "../services/userDetail";
import { debug } from "util";

const initState = {
	id: "",
	list: [],
	pagination: {
		current: 1,
		pageSize: 20,
		total: 0
	},
	loginLogList: [],
	logPagination: {
		current: 1,
		pageSize: 20,
		total: 0
	},
};

export default {
	namespace: "userDetail",

	state: {
		...initState
	},

	effects: {
		*loadProfile({ payload }, { call, put }) {
			const data = yield call(loadProfile, payload);
			if (data && data.success) {
				yield put({ type: "loadProfileSuccess", payload: data });
			}
		},

		*passAudit({ payload }, { call, put }) {
			const data = yield call(passProfile, payload);
			if (data && data.success) {
				yield put({ type: "passProfileSuccess", payload: data });
			}
		},

		*refuseAudit({ payload }, { call, put }) {
			const data = yield call(refuseProfile, payload);
			if (data && data.success) {
				yield put({ type: "refuseProfileSuccess", payload: payload });
			}
		},

		*loadContacts({ payload }, { call, put }) {
			yield put({ type: "showLoading" });
			payload.sortField = "id";
			payload.sortOrder = "desc";
			const data = yield call(queryContact, payload);
			yield put({
				type: "loadContactSuccess",
				payload: {
					data,
					current: payload.page,
					pageSize: payload.pageSize,
					keyword: payload.keyword || '',
				}
			});
			yield put({ type: "hideLoading" });
			// yield put({ type: "selectedRowKeys", payload: { selectedRowKeys: [] } });
		},
		*loadLoginLog({ payload }, { call, put }) {
			yield put({ type: "showLoading" });
			payload.sortField = "id";
			payload.sortOrder = "desc";
			const data = yield call(queryLoginLog, payload);
			yield put({
				type: "loadLoginLogSuccess",
				payload: {
					data,
					current: payload.page,
					pageSize: payload.pageSize,
				}
			});
			yield put({ type: "hideLoading" });
			// yield put({ type: "selectedRowKeys", payload: { selectedRowKeys: [] } });
		},
	},

	reducers: {
		resetState(state) {
			return { ...state, ...initState };
		},

		loadProfileSuccess(state, action) {
			const data = action.payload && action.payload.profile;
			if (data) {
				return {
					...state,
					...data,
					cont: window.decodeURIComponent(data.cont || "")
				};
			}
			return state;
		},
		passProfileSuccess(state, action) {
			return {
				...state,
				status: 1,
				refuse: '',
			};
		},
		refuseProfileSuccess(state, action) {
			const data = action.payload;
			if (data) {
				return {
					...state,
					status: 2,
					refuse: data.refuse,
				};
			}
			return state;
		},
		loadContactSuccess(state, action) {
			const actionData = action.payload.data;
			return {
				...state,
				contactList: actionData.record,
				selectedRowKeys: [],
				pagination: {
					current: action.payload.current,
					pageSize: action.payload.pageSize,
					total: actionData.totalRecord || 0
				}
			};
		},
		loadLoginLogSuccess(state, action) {
			const actionData = action.payload.data;
			return {
				...state,
				loginLogList: actionData.record,
				selectedRowKeys: [],
				logPagination: {
					current: action.payload.current,
					pageSize: action.payload.pageSize,
					total: actionData.totalRecord || 0
				}
			};
		},
	}
};
