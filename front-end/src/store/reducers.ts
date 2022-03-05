import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import eventsReducer from "./events";

export default combineReducers({
  entities: entitiesReducer,
  events: eventsReducer,
});
