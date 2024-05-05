import "./App.css";
import Filters from "./components/Filters/Filters";
import JobsList from "./components/Jobs/JobsList";

function App() {
  return (
    <div className="App">
      <Filters />
      <JobsList></JobsList>
    </div>
  );
}

export default App;
