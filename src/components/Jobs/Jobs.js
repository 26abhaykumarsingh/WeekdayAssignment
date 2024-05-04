import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync, selectJobs } from "./jobsSlice";

function Jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  useEffect(() => {
    dispatch(fetchJobsAsync({ limit: 10, offset: 0 }));
  }, []);
  useEffect(() => {
    console.log(jobs);
  }, [jobs]);
  return <div></div>;
}

export default Jobs;
