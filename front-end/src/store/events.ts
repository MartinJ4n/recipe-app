import { combineReducers } from "redux";
import entryReducer from "./slices/entry";

export default combineReducers({
  entry: entryReducer,
});
