import { request } from "../utils";

export async function loadProfile(params) {
	const id = params.id || 0;
	const url = `/api/profile/detail`;

	return request({
		url,
		method: "get",
		data: {
			id: params.id
		}
	});
}

export async function passProfile(params) {
	const url = `/api/profile/pass`;

	return request({
		url,
		method: "get",
		data: {
			id: params.id
		}
	});
}

export async function refuseProfile(params) {
	const url = '/api/profile/refuse';

	return request({
		url,
		method: 'POST',
		data: params
	});
}

export async function update(params) {
	const id = params.id || 0;
	if (!id) {
		return;
	}

	delete params.id;

	return request({
		url: `/api/restql/web_node/${id}`,
		method: "put",
		data: params
	});
}

export async function queryContact(params) {
	return request({
		url: "/api/contact/search",
		method: "GET",
		data: params
	});
}

export async function queryLoginLog(params) {
	return request({
		url: "/api/loginlog/search",
		method: "GET",
		data: params
	});
}

export async function save(params) {
	return request({
		url: "/api/restql/web_node",
		method: "post",
		data: params
	});
}

export async function addTable(params) {
	return request({
		url: "/api/table",
		method: "post",
		data: params
	});
}
export async function updateTable(params) {
	return request({
		url: "/api/table",
		method: "put",
		data: params
	});
}
