import { configureStore } from "@reduxjs/toolkit";
import expense from "./expense";

export const store = configureStore({
  reducer: { expense },
});
