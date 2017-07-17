import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import moviesReducer from "./moviesReducer";

export default combineReducers({
  loading: loadingReducer,
  movies: moviesReducer
});