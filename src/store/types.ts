import { IAppState } from "./modules/app";

export interface IRootState {}
export interface IRootWithModule {
  app: IAppState;
}

export type IStoreType = IRootState & IRootWithModule;
