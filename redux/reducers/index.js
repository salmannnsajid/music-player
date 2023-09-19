import { combineReducers } from "redux";
import musicReducer from "./musicReducer";

const rootReducer = combineReducers({
  music: musicReducer,
});

export default rootReducer;
