import { request } from "../utils";

export async function login(params) {
  return request({
    url: "/api/user/signin",
    method: "POST",
    data: {
      mobile: params.mobile,
      password: params.password
    }
  });
}
