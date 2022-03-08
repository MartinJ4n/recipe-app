import { combineReducers } from "redux";
import exampleReducer from "./slices/example";

export default combineReducers({
  example: exampleReducer,
});
