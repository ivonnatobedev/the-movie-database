import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import moviesReducer from "./moviesReducer";
import { reducer as toastrReducer } from "react-redux-toastr";

export default combineReducers({
  loading: loadingReducer,
  movies: moviesReducer,
  toastr: toastrReducer
});