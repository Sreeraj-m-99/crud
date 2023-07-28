import { combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";

const rootReducer = combineReducers({
  employee: employeeReducer,
});

export default rootReducer;
