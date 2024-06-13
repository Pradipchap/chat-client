export const CLIENT_BASE_URL = import.meta.env.VITE_CLIENT_BASE_URL;
export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
export const NUMBER_REGEX = /^[0-9]*$/;
export const WEBSOCKET_BASE_URL = import.meta.env.VITE_WEBSOCKET_BASE_URL;
export enum SUBMIT_STATUS {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  FAILED = "failed",
}
