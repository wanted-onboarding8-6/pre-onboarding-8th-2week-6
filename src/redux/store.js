import { configureStore } from "@reduxjs/toolkit";
import issueSlice from "./issueSlice";
import dndSlice from "./dndSlice";

const store = configureStore({
  reducer: {
    issueSlice,
    dndSlice,
  },
});
export default store;
