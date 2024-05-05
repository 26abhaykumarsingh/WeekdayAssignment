import React, { useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import { capitalize } from "../../app/lib";
import "./jobCard.css";

function JobCard({ job, forwardedRef }) {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const handleShowMoreClick = () => {
    const temp = isAboutExpanded;
    setIsAboutExpanded(!temp);
  };
  return (
    <div className="jobCard" ref={forwardedRef}>
      <div className="jobHeading">
        <div className="jobLogo">
          <img
            src={job?.logoUrl}
            alt=""
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="jobHeadingText">
          <div className="jobCompany">{capitalize(job?.companyName)}</div>
          <div className="jobRole">{capitalize(job?.jobRole)}</div>
          <div className="jobLocation">{capitalize(job?.location)}</div>
        </div>
      </div>
      <div className="jobSalRange">
        Estimated Salary: ${job?.minJdSalary ? job?.minJdSalary : "??"} -{" "}
        {job?.maxJdSalary ? job?.maxJdSalary : "??"}
      </div>
      {!isAboutExpanded ? (
        <div className="jobAbout">
          <div className="jobAboutTitle">About Company:</div>
          <div className="jobAboutUsTitle">About us</div>
          <div className="jobAboutText">{job?.jobDetailsFromCompany}</div>
          <div className="jobAboutShowMore" onClick={handleShowMoreClick}>
            Show more
          </div>
        </div>
      ) : (
        <div className="jobAboutExpanded">
          <div className="jobAboutTitle">About Company:</div>
          <div className="jobAboutTextExpanded">
            {job?.jobDetailsFromCompany}
          </div>
          <div className="jobAboutShowLess" onClick={handleShowMoreClick}>
            Show Less
          </div>
        </div>
      )}
      {job?.minExp && (
        <div className="jobExp">
          <div className="jobExpTitle">Minimum Experience</div>
          <div className="jobMinExp">{job?.minExp} years</div>
        </div>
      )}
      <div className="applyBtn">
        <BoltIcon style={{ color: "orange" }} />
        <div className="applyText">Easy Apply</div>
      </div>
    </div>
  );
}

export default JobCard;
