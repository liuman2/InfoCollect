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

export async function profileInfo(params) {
  return request({
    url: "/api/profile/info",
    method: "GET",
    data: {
      user_id: params.userId
    }
  });
}

export async function profileDetail(params) {
  return request({
    url: "/api/profile/get",
    method: "GET",
    data: {
      user_id: params.userId
    }
  });
}

export async function upload(params) {
  return request({
    url: "/api/attachment/upload",
    method: "upload",
    data: {
      file: params.file
    }
  });
}

export async function saveDetail(profile) {
  return request({
    url: "/api/profile/save",
    method: "POST",
    data: profile
  });
}
