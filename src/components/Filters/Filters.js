import "./Filters.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredJobs,
  selectJobs,
  updateFilteredJobs,
} from "../Jobs/jobsSlice";

function Filters() {
  const dispatch = useDispatch();

  const [minExp, setMinExp] = useState(0);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [role, setRole] = useState("");
  const [minBasePay, setMinBasePay] = useState(0);

  const handleMinExpChange = (e) => {
    setMinExp(e.target.value);
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };
  const handleLocationChange = (e) => {
    console.log("locationChanged", e.target.value);
    setLocation(e.target.value);
  };
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const handleMinBasePayChange = (e) => {
    setMinBasePay(e.target.value);
  };

  let allJobs = useSelector(selectJobs).jdList;
  useEffect(() => {
    dispatch(updateFilteredJobs(allJobs));
  }, [allJobs]);

  const jobs = useSelector(selectFilteredJobs);
  // updateFilteredJobs(jobs);

  useEffect(() => {
    console.log("handleSearchRunning");
    let filteredResult = allJobs;
    if (minExp !== 0) {
      filteredResult = filteredResult.filter((item) => item.minExp >= minExp);
    }
    if (company !== "") {
      filteredResult = filteredResult.filter(
        (item) => item.companyName.toLowerCase() == company.toLowerCase()
      );
    }
    if (location !== "") {
      filteredResult = filteredResult.filter(
        (item) => item.location.toLowerCase() == location.toLowerCase()
      );
    }
    if (mode !== "") {
      if (mode == "remote") {
        filteredResult = filteredResult.filter(
          (item) => item.location.toLowerCase() == mode.toLowerCase()
        );
      } else {
        filteredResult = filteredResult.filter(
          (item) => item.location.toLowerCase() != "remote"
        );
      }
    }
    if (role !== "") {
      filteredResult = filteredResult.filter(
        (item) => item.jobRole.toLowerCase() == role.toLowerCase()
      );
    }
    if (minBasePay !== 0) {
      filteredResult = filteredResult.filter(
        (item) => item.minJdSalary >= minBasePay
      );
    }
    console.log("filteredResult", filteredResult);
    dispatch(updateFilteredJobs(filteredResult));
  }, [minExp, company, location, mode, role, minBasePay, allJobs]);

  return (
    <div className="Filters">
      <div className="Filters__list">
        <div className="filter">
          <div style={{ minWidth: "150px" }}>
            <TextField
              type="number"
              label="Minimum Experience"
              id="outlined-size-small"
              size="small"
              onChange={(e) => handleMinExpChange(e)}
            />
          </div>
        </div>
        <div className="filter">
          <div style={{ width: "120px" }}>
            <TextField
              label="Company"
              id="outlined-size-small"
              size="small"
              onChange={(e) => handleCompanyChange(e)}
            />
          </div>
        </div>
        <div className="filter">
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Location</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={age}
                label="Location"
                onChange={handleLocationChange}
              >
                <MenuItem value="">
                  <em>--no selection--</em>
                </MenuItem>
                <MenuItem value={"delhi ncr"}>Delhi NCR</MenuItem>
                <MenuItem value={"mumbai"}>Mumbai</MenuItem>
                <MenuItem value={"chennai"}>Chennai</MenuItem>
                <MenuItem value={"bangalore"}>Bangalore</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="filter">
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Mode</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={age}
                label="Mode"
                onChange={handleModeChange}
              >
                <MenuItem value="">
                  <em>--no selection--</em>
                </MenuItem>
                <MenuItem value={"remote"}>Remote</MenuItem>
                <MenuItem value={"on-site"}>On-site</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="filter">
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Role</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={age}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value="">
                  <em>--no selection--</em>
                </MenuItem>
                <MenuItem value={"frontend"}>Frontend</MenuItem>
                <MenuItem value={"ios"}>iOS</MenuItem>
                <MenuItem value={"android"}>Android</MenuItem>
                <MenuItem value={"tech lead"}>Tech Lead</MenuItem>
                <MenuItem value={"backend"}>Backend</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="filter">
          <div style={{ minWidth: "150px" }}>
            <TextField
              type="number"
              label="Minimum Base Pay"
              id="outlined-size-small"
              size="small"
              onChange={handleMinBasePayChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
