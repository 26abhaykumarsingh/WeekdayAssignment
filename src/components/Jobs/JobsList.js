import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsAsync,
  selectFilteredJobs,
  selectAllJobs,
  updateFilteredJobs,
  selectStatus,
  selectHasMore,
} from "./jobsSlice";
import "./jobsList.css";
import BoltIcon from "@mui/icons-material/Bolt";
import { capitalize } from "../../app/lib";
import JobCard from "../JobCard/JobCard";

function JobsList() {
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobsAsync({ limit: limit, offset: offset }));
  }, [offset]);

  let hasMore = useSelector(selectHasMore);

  const status = useSelector(selectStatus);

  const observer = useRef();
  //function inside callback run everytime lastBook is rendered
  const lastJobRef = useCallback(
    (node) => {
      if (status == "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore]
  );

  // useEffect(() => {
  //   console.log("status", status);
  // }, [status]);

  let filteredJobs = useSelector(selectFilteredJobs);

  useEffect(() => {
    console.log("filteredJobs", filteredJobs);
    // let minJdSalary = [...new Set(jobs?.jdList?.map((job) => job.minJdSalary))];
    // console.log("minJdSalary", minJdSalary);
  }, [filteredJobs]);

  return (
    <>
      {status === "loading" && filteredJobs.length === 0 && (
        <div className="noJobsContainer">
          <div className="loadingImg"></div>
          <div className="noJobsText">Loading...</div>
        </div>
      )}
      {status === "idle" && filteredJobs.length === 0 && (
        <div className="noJobsContainer">
          <div className="noJobsImg"></div>
          <div className="noJobsText">No jobs available for this query</div>
        </div>
      )}
      <div className="jobs">
        {filteredJobs?.map((job, index) => {
          if (filteredJobs.length === index + 1) {
            return (
              <JobCard
                forwardedRef={lastJobRef}
                key={job.jdUid}
                job={job}
              ></JobCard>
            );
          }
          return <JobCard job={job} key={job.jdUid}></JobCard>;
        })}
      </div>
    </>
  );
}

export default JobsList;
