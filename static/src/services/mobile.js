import { request } from "../utils";

export async function login(params) {
  return request({
    url: "/api/member/authorize",
    // url: '/oauth2/access_token',
    method: "POST",
    data: {
      username: params.name,
      password: params.pass,
      client_id: "eggClient",
      grant_type: "password"
    }
  });
}
