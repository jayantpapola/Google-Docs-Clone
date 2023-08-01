import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";
import docsReducer from "./reducer/document";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    docs: docsReducer,
  },
});
