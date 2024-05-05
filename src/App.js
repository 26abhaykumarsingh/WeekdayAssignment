import { useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters/Filters";
import JobsList from "./components/Jobs/JobsList";
import { useDispatch } from "react-redux";
import { fetchJobsAsync } from "./components/Jobs/jobsSlice";

function App() {
  return (
    <div className="App">
      <Filters />
      <JobsList></JobsList>
    </div>
  );
}

export default App;
