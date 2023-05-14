import { configureStore } from "@reduxjs/toolkit";
import formReduxReducer from "./reducers/formReduxReducer";

export const store = configureStore({
  reducer: {
    formReduxReducer,
  },
});
