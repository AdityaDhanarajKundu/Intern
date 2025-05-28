import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import JobCards from "./components/JobCards";
import CreateJobModal from "./components/CreateJobModal";
import { api } from "./services/api";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    minSalary: 0,
    maxSalary: 100,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const { jobTitle, location, jobType, minSalary, maxSalary } = filters;
    api
      .get("/", {
        params: {
          jobTitle,
          location,
          jobType,
          minSalary,
          maxSalary,
        },
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, [filters]);

  return (
    <>
      <Navbar onCreateJobClick={() => setIsModalOpen(true)} />
      <FilterBar onFilterChange={setFilters} />
      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="min-h-screen bg-gray-50 py-10  pl-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-6">
          {jobs.map((job) => (
            <JobCards key={job.id} job={job} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
