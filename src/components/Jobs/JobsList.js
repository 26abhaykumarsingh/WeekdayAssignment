import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsAsync,
  selectFilteredJobs,
  selectStatus,
  selectHasMore,
  selectError,
} from "./jobsSlice";
import "./jobsList.css";
import JobCard from "../JobCard/JobCard";

function JobsList() {
  const [limit, setLimit] = useState(15); //jobs in one fetch
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

  //this useeffect run when more items are needed to be loaded
  useEffect(() => {
    dispatch(fetchJobsAsync({ limit: limit, offset: offset }));
  }, [offset]);

  let hasMore = useSelector(selectHasMore);

  const status = useSelector(selectStatus);

  const observer = useRef();
  //function inside callback run everytime lastJob is rendered
  const lastJobRef = useCallback(
    (node) => {
      if (status == "loading") return; //no more fetch if already loading
      if (observer.current) observer.current.disconnect(); //remove ref from last job when more jobs are being fetched
      observer.current = new IntersectionObserver((entries) => {
        //if lastJob is visible on screen and we have more jobs available, increase offset to fetch more jobs
        if (entries[0].isIntersecting && hasMore) {
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
  let error = useSelector(selectError);

  useEffect(() => {
    console.log("filteredJobs", filteredJobs);
    // let minJdSalary = [...new Set(jobs?.jdList?.map((job) => job.minJdSalary))];
    // console.log("minJdSalary", minJdSalary);
  }, [filteredJobs]);

  return (
    <>
      {status === "idle" && filteredJobs.length === 0 && error != null && (
        <div className="noJobsContainer">
          <div className="errorImg"></div>
          <div className="noJobsText">Some error occured</div>
        </div>
      )}
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
      {status === "loading" && filteredJobs.length !== 0 && (
        <div className="noJobsContainer">
          <div className="noJobsText">Loading...</div>
        </div>
      )}
    </>
  );
}

export default JobsList;
