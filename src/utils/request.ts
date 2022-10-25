import axios, { AxiosResponse } from "axios";
import { getLocalData } from "@/utils/local"
declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}
import { createVueWait } from "vue-wait";
import useUserStore from "@/store/user";

const request = axios.create({
  baseURL: '/dev-api',
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config: any) => {
    config.headers.common["Content-Type"] = "application/json;charset=UTF-8";
    const isToken = (config.headers || {}).isToken || true;
    const token = getLocalData("token");
    if (isToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res: any) => {
    const code = res.data.code
    if (code === 200) {
      return res.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
