import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsAsync, selectJobs } from "./jobsSlice";
import "./jobsList.css";
import BoltIcon from "@mui/icons-material/Bolt";
import { capitalize } from "../../app/lib";

function JobsList() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  useEffect(() => {
    dispatch(fetchJobsAsync({ limit: 10, offset: 0 }));
  }, []);
  useEffect(() => {
    console.log(jobs);
  }, [jobs]);
  return (
    <div className="jobs">
      {jobs?.jdList?.map((job) => (
        <>
          <div className="jobCard">
            <div className="jobHeading">
              <div className="jobLogo">
                <img
                  src={job.logoUrl}
                  alt=""
                  style={{ width: "80px", height: "80px", borderRadius: "3px" }}
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
        </>
      ))}
    </div>
  );
}

export default JobsList;