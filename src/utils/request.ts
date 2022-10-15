import axios from "axios";
import { createVueWait } from "vue-wait"
import useUserStore from "@/store/user";

// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config: any) => {
    config.headers.common["Content-Type"] = "application/json;charset=UTF-8";
    const isToken = (config.headers || {}).isToken || false;
    const { token = "" } = useUserStore();
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
    if (res.code === 200) {
      return res.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
