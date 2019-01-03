import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import teaReducers from "./teaReducers";
import typesReducer from "./typesReducer";
import flashReducer from "./flashReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  teas: teaReducers,
  teaTypes: typesReducer,
  flash: flashReducer
});
