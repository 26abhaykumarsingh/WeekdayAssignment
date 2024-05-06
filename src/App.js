import { useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters/Filters";
import JobsList from "./components/Jobs/JobsList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobsAsync,
  selectAllJobs,
  selectFilteredJobs,
  selectStatus,
} from "./components/Jobs/jobsSlice";
import Header from "./components/Header/Header";

function App() {
  const status = useSelector(selectStatus);
  const allJobs = useSelector(selectAllJobs);
  return (
    <div className="App">
      <Header />
      {!(status === "loading" && allJobs.length === 0) && <Filters />}
      <JobsList></JobsList>
    </div>
  );
}

export default App;
