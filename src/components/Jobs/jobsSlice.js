import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJobs } from "./jobsAPI";

const initialState = {
  status: "idle",
  items: [],
  error: null,
};

export const fetchJobsAsync = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ limit, offset }) => {
    const response = await fetchJobs(limit, offset);
    return response;
  }
);

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectJobs = (state) => state.jobs.items;

export default jobsSlice.reducer;
