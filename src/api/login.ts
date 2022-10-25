import request from "@/utils/request";
import { userFrom } from "@/typings/types";

//登录
export const login = async (data: userFrom) => {
  return await request({
    url: "/admin/login",
    method: "post",
    headers: {
      isToken: false,
    },
    data,
  });
};

// 退出登录
export const logout = async () => {
  return await request({
    url: "/admin/auth/logout",
    method: "get",
  });
};
