import * as types from "../constants/actionTypes";

export function startLoading() {
  return {
    type: types.START_LOADING
  };
}

export function stopLoading() {
  return {
    type: types.STOP_LOADING
  }
}