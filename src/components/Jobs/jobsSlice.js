import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJobs } from "./jobsAPI";

const initialState = {
  status: "idle",
  items: [],
  error: null,
  filteredJobs: [], //filteredJobs are filtered out jobs
  totalCount: 0,
  hasMore: true, //hasMore tells us if more jobs are available
};

export const fetchJobsAsync = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ limit, offset }) => {
    const response = await fetchJobs(limit, offset);
    // console.log("response", response);
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
        state.items.push(...action.payload.jdList);
        state.totalCount = action.payload.totalCount;
        state.hasMore = state.totalCount > state.items.length;
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },

  reducers: {
    updateFilteredJobs: (state, action) => {
      state.filteredJobs = action.payload;
      // console.log("filteredjobs", action.payload);
    },
  },
});

export const { updateFilteredJobs } = jobsSlice.actions;

export const selectAllJobs = (state) => state.jobs.items;
export const selectFilteredJobs = (state) => state.jobs.filteredJobs;
export const selectError = (state) => state.jobs.error;
export const selectStatus = (state) => state.jobs.status;
export const selectHasMore = (state) => state.jobs.hasMore;

export default jobsSlice.reducer;
