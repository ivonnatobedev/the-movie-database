import * as types from "../constants/actionTypes";

const initialState = {
  isLoading: false
};

export default function (state = initialState, action) {
  switch(action.type) {

    case types.START_LOADING:
      return {
        isLoading: true
      };

    case types.STOP_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}