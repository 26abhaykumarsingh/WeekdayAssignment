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

function JobsList() {
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobsAsync({ limit: limit, offset: offset }));
    console.log("fetchJobsAsyncRunning");
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
          console.log("Visible");
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [status, hasMore]
  );

  useEffect(() => {
    console.log("status", status);
  }, [status]);

  let filteredJobs = useSelector(selectFilteredJobs);

  useEffect(() => {
    console.log("filteredJobs", filteredJobs);
    // let minJdSalary = [...new Set(jobs?.jdList?.map((job) => job.minJdSalary))];
    // console.log("minJdSalary", minJdSalary);
  }, [filteredJobs]);

  return (
    <div className="jobs">
      {filteredJobs?.map((job, index) => {
        if (filteredJobs.length === index + 1) {
          return (
            <div ref={lastJobRef} className="jobCard">
              <div className="jobHeading">
                <div className="jobLogo">
                  <img
                    src={job.logoUrl}
                    alt=""
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "3px",
                    }}
                  />
                </div>
                <div className="jobHeadingText">
                  <div className="jobCompany">
                    {capitalize(job.companyName)}
                  </div>
                  <div className="jobRole">{capitalize(job.jobRole)}</div>
                  <div className="jobLocation">{capitalize(job.location)}</div>
                </div>
              </div>
              <div className="jobSalRange">
                Estimated Salary: ${job.minJdSalary ? job.minJdSalary : "??"} -{" "}
                {job.maxJdSalary ? job.maxJdSalary : "??"}
              </div>
              <div className="jobAbout">
                <div className="jobAboutTitle">About Company:</div>
                <div className="jobAboutText">{job.jobDetailsFromCompany}</div>
                <div className="jobAboutShowMore">Show more</div>
              </div>
              {job.minExp && (
                <div className="jobExp">
                  <div className="jobExpTitle">Minimum Experience</div>
                  <div className="jobMinExp">{job.minExp} years</div>
                </div>
              )}
              <div className="applyBtn">
                <BoltIcon style={{ color: "orange" }} />
                <div className="applyText">Easy Apply</div>
              </div>
            </div>
          );
        }
        return (
          <div className="jobCard">
            <div className="jobHeading">
              <div className="jobLogo">
                <img
                  src={job.logoUrl}
                  alt=""
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "3px",
                  }}
                />
              </div>
              <div className="jobHeadingText">
                <div className="jobCompany">{capitalize(job.companyName)}</div>
                <div className="jobRole">{capitalize(job.jobRole)}</div>
                <div className="jobLocation">{capitalize(job.location)}</div>
              </div>
            </div>
            <div className="jobSalRange">
              Estimated Salary: ${job.minJdSalary ? job.minJdSalary : "??"} -{" "}
              {job.maxJdSalary ? job.maxJdSalary : "??"}
            </div>
            <div className="jobAbout">
              <div className="jobAboutTitle">About Company:</div>
              <div className="jobAboutText">{job.jobDetailsFromCompany}</div>
              <div className="jobAboutShowMore">Show more</div>
            </div>
            {job.minExp && (
              <div className="jobExp">
                <div className="jobExpTitle">Minimum Experience</div>
                <div className="jobMinExp">{job.minExp} years</div>
              </div>
            )}
            <div className="applyBtn">
              <BoltIcon style={{ color: "orange" }} />
              <div className="applyText">Easy Apply</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default JobsList;
