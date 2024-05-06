import "./Filters.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredJobs,
  selectAllJobs,
  updateFilteredJobs,
} from "../Jobs/jobsSlice";
import { companyNamesOptions, jobRolesOptions } from "../../data";
import { capitalize } from "../../app/lib";

function Filters() {
  const dispatch = useDispatch();

  //states
  const [minExp, setMinExp] = useState(0);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [roles, setRoles] = useState([]);
  const [minBasePay, setMinBasePay] = useState(0);

  //handlers
  const handleMinExpChange = (e) => {
    setMinExp(e.target.value);
  };
  const handleCompanyChange = (e, value) => {
    if (!value || value.length == 0) {
      setCompany("");
    } else {
      setCompany(value);
    }
    // console.log("company", value);
  };
  const handleLocationChange = (e) => {
    // console.log("locationChanged", e.target.value);
    setLocation(e.target.value);
  };
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  const handleRoleChange = (event, selectedOptions) => {
    const selectedRoles = selectedOptions.map((option) => option.trim());
    setRoles(selectedRoles);
    console.log(selectedRoles);
  };
  const handleMinBasePayChange = (e) => {
    setMinBasePay(e.target.value);
  };

  let allJobs = useSelector(selectAllJobs);
  // useEffect(() => {
  //   dispatch(updateFilteredJobs(allJobs));
  //   // console.log("allJobs", allJobs);
  // }, [allJobs]);

  // const jobs = useSelector(selectFilteredJobs);
  // updateFilteredJobs(jobs);

  // useEffect(() => {
  //   console.log("roles", roles);
  // }, [roles]);

  //Filtering logic, runs whenever any filter state change
  useEffect(() => {
    let filteredResult = allJobs;
    if (minExp !== 0) {
      filteredResult = filteredResult.filter((item) => item.minExp >= minExp);
    }
    if (company !== "") {
      filteredResult = filteredResult.filter(
        (item) => item?.companyName?.toLowerCase() == company?.toLowerCase()
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
    if (roles.length !== 0) {
      filteredResult = filteredResult.filter((item) => {
        for (let role of roles) {
          if (item.jobRole.toLowerCase() === role.toLowerCase()) {
            return true; // Include the item if it matches any role
          }
        }
        return false; // Exclude the item if it doesn't match any role
      });
    }
    if (minBasePay !== 0) {
      filteredResult = filteredResult.filter(
        (item) => item.minJdSalary >= minBasePay
      );
    }
    // console.log("filteredResult", filteredResult);
    dispatch(updateFilteredJobs(filteredResult)); //update filteredJobs
  }, [minExp, company, location, mode, roles, minBasePay, allJobs]);

  return (
    <div className="Filters">
      <div className="Filters__list">
        <div className="filter">
          <div style={{ minWidth: "150px" }}>
            <Autocomplete
              sx={{
                m: 1,
                minWidth: 150,
                "@media (max-width: 780px)": { width: "220px" },
              }}
              size="small"
              multiple
              options={jobRolesOptions}
              getOptionLabel={(option) => capitalize(option)}
              disableCloseOnSelect
              onChange={handleRoleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Roles"
                  placeholder="Roles"
                  // inputProps={{ style: { fontSize: "10px" } }}
                />
              )}
            />
          </div>
        </div>
        <div className="filter">
          <div style={{ minWidth: "150px" }}>
            <TextField
              type="number"
              label="Minimum Experience"
              id="outlined-size-small"
              size="small"
              onChange={(e) => handleMinExpChange(e)}
              sx={{
                m: 1,
                minWidth: 120,
                "@media (max-width: 780px)": { width: "220px" },
              }}
            />
          </div>
        </div>

        <div className="filter">
          <Box>
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                "@media (max-width: 780px)": { width: "220px" },
              }}
              size="small"
            >
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
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                "@media (max-width: 780px)": { width: "220px" },
              }}
              size="small"
            >
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
          <div>
            <TextField
              type="number"
              label="Minimum Base Pay"
              id="outlined-size-small"
              size="small"
              onChange={handleMinBasePayChange}
              sx={{
                m: 1,
                minWidth: 150,
                "@media (max-width: 780px)": { width: "220px" },
              }}
            />
          </div>
        </div>
        {/* <div className="filter">
          <div style={{ width: "120px" }}>
            <TextField
              label="Company"
              id="outlined-size-small"
              size="small"
              onChange={(e) => handleCompanyChange(e)}
            />
          </div>
        </div> */}
        <div className="filter">
          <div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={companyNamesOptions}
              sx={{
                m: 1,
                minWidth: 150,
                "@media (max-width: 780px)": { width: "220px" },
              }}
              size="small"
              onChange={handleCompanyChange}
              renderInput={(params) => (
                <TextField {...params} label="Company" />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
