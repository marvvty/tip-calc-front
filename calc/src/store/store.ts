import { configureStore } from "@reduxjs/toolkit";
import checkReducer from "./slice/checkSlices";

export const store = configureStore({
  reducer: {
    checks: checkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
