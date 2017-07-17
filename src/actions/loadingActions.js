import * as types from "../constants/actionTypes";

export const startLoading = () => {
  return {
    type: types.START_LOADING
  };
};

export const stopLoading = () => {
  return {
    type: types.STOP_LOADING
  }
};