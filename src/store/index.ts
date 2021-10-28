/*
 * @Description: 全局状态管理
 */
import {
  createStore,
  createLogger,
  useStore as useVuexStore,
  Store,
} from "vuex";
import createPersistedState from "vuex-persistedstate";
import { Keys } from "@/constant/key";
import storage, { StorageType } from "@/utils/storage";

import { IRootState, IStoreType } from "./types";

// moudules
import app from "./modules/app";

const plugins: any = [
  createPersistedState({
    key: Keys.vuex,
    paths: ["device"], //需要本地存储的模块名称
    storage: {
      setItem: (key, value) => storage.setItem(StorageType.session, key, value),
      getItem: (key) => storage.getItem(StorageType.session, key),
      removeItem: (key) => storage.removeItem(StorageType.session, key),
    },
  }),
];
// if (process.env.NODE_ENV !== 'production') plugins.push(createLogger({}))

export const store = createStore<IRootState>({
  plugins,
  modules: {
    app,
  },
});

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}
