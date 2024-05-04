import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../components/Jobs/jobsSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});
