import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJobs } from "./jobsAPI";

const initialState = {
  status: "idle",
  items: [],
  error: null,
  filteredJobs: [],
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

  reducers: {
    updateFilteredJobs: (state, action) => {
      state.filteredJobs = action.payload;
      console.log("filteredjobs", action.payload);
    },
  },
});

export const selectJobs = (state) => state.jobs.items;
export const selectFilteredJobs = (state) => state.jobs.filteredJobs;
export const { updateFilteredJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
