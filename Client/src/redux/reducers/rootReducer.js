import isLogged from "./isLogged";
import jwt from "./jwt";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  isLogged,
  jwt,
});

export default rootReducer;
