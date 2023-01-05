import { configureStore } from "@reduxjs/toolkit";
import issueSlice from "./issueSlice";

const store = configureStore({
  reducer: {
    issueSlice,
  },
});
export default store;
