import { Keys } from "@/constant/key";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import storage, { StorageType } from "../storage";
import { LoadingUtil } from "../loadingUtil";
import { MyAxiosReqConfig } from "./types";
import { handleHttpError } from "./handleHttpError";

const loading = new LoadingUtil({
  text: "正在加载",
  background: "rgba(0,0,0,0.5)",
  target: ".main-container",
});

export default {
  // 请求拦截处理
  requestInterceptor: (
    axiosConfig: MyAxiosReqConfig,
    config: AxiosRequestConfig
  ): AxiosRequestConfig => {
    if (!axiosConfig.hideLoading) loading.show();
    const token = storage.getItem(StorageType.cookie, Keys.token);
    if (token) config.headers!["token"] = token || "";
    return config;
  },
  // 响应拦截处理
  responseInterceptor: (
    axiosConfig: MyAxiosReqConfig,
    response: AxiosResponse
  ): AxiosResponse => {
    if (!axiosConfig.hideLoading) loading.hidden();
    return response.data;
  },
  // 响应错误处理
  responseHttpError: (axiosConfig: MyAxiosReqConfig, err: any) => {
    if (!axiosConfig.hideLoading) loading.hidden();
    handleHttpError(axiosConfig, err);
  },
};
