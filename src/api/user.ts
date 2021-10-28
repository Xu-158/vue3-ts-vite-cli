import myAxios from "@/utils/http";
import { IDataType } from "@/utils/http/types";

enum Api {
  login = "/user/Login",
  getDeviceList = "/devices/get",
}

export const login = (UStr: string, MStr: string) => {
  return myAxios<IDataType>({
    method: "post",
    url: Api.login,
    data: { UStr, MStr },
  });
};

export const getDeviceList = (token: string) => {
  return myAxios({
    method: "get",
    url: Api.getDeviceList,
    params: { token },
  });
};
