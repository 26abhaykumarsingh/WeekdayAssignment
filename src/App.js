import { useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters/Filters";
import JobsList from "./components/Jobs/JobsList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsAsync,
  selectFilteredJobs,
  selectStatus,
} from "./components/Jobs/jobsSlice";
import Header from "./components/Header/Header";

function App() {
  const status = useSelector(selectStatus);
  const filteredJobs = useSelector(selectFilteredJobs);
  return (
    <div className="App">
      <Header />
      {!(status === "loading" && filteredJobs.length === 0) && <Filters />}
      <JobsList></JobsList>
    </div>
  );
}

export default App;
