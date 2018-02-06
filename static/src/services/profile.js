import { request } from "../utils";

export async function query(params) {
	return request({
		url: "/api/profile/get",
		method: "GET",
		data: params
	});
}
