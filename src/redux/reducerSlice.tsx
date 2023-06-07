import { combineReducers } from "@reduxjs/toolkit";
import imgurSliceReducer from "../redux/features/slice";
const rootReducer = combineReducers({
  imgur: imgurSliceReducer,
});

export default rootReducer;
