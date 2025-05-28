import { useState, useEffect, useRef } from "react";
import { Search, MapPin, User } from "lucide-react";
import {Range} from "react-range";

const suggestedLocations = [
  "Mumbai",
  "Bengaluru",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Remote",
];
  
const DEFAULT_SALARY = [0, 100];
export default function FilterBar({onFilterChange}) {
  const [salaryRange, setSalaryRange] = useState(DEFAULT_SALARY);
  const [locationInput, setLocationInput] = useState("");
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (locationInput === "") {
      setFilteredLocations(suggestedLocations);
    } else {
      setFilteredLocations(
        suggestedLocations.filter((loc) =>
          loc.toLowerCase().includes(locationInput.toLowerCase())
        )
      );
    }
  }, [locationInput]);

  useEffect(() => {
    onFilterChange({
      jobTitle: jobTitleInput,
      location: locationInput,
      jobType: selectedJobType,
      minSalary:
        salaryRange[0] === DEFAULT_SALARY[0] ? undefined : salaryRange[0],
      maxSalary:
        salaryRange[1] === DEFAULT_SALARY[1] ? undefined : salaryRange[1],
    });
  }, [jobTitleInput, locationInput, selectedJobType, salaryRange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full mt-4 mb-8 mx-auto h-[130px] bg-white shadow-[0_0_14px_rgba(198,191,191,0.25)] flex items-center justify-between px-28 rounded-xl gap-6 flex-wrap font-satoshi">
      {/* Search Box */}
      <div className="flex items-center gap-2 flex-1 min-w-[220px]">
        <Search className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          value={jobTitleInput}
          onChange={(e) => setJobTitleInput(e.target.value)}
          placeholder="Search By Job Title, Role"
          className="outline-none text-sm text-gray-700 w-full bg-transparent"
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-[1px] h-10 bg-gray-200" />

      {/* Location Dropdown */}
      <div
        className="relative flex items-center gap-2 flex-1 min-w-[160px]"
        ref={dropdownRef}
      >
        <MapPin className="text-gray-500 w-5 h-5" />
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Preferred Location"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="text-sm text-gray-700 bg-transparent outline-none w-full"
          />
          {showDropdown && filteredLocations.length > 0 && (
            <ul className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-md z-10 max-h-40 overflow-y-auto hide-scrolbar">
              {filteredLocations.map((loc) => (
                <li
                  key={loc}
                  onClick={() => {
                    setLocationInput(loc);
                    setShowDropdown(false);
                  }}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-[1px] h-10 bg-gray-200" />

      {/* Job Type Dropdown */}
      <div className="flex items-center gap-2 flex-1 min-w-[140px]">
        <User className="text-gray-500 w-5 h-5" />
        <select value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)} className="text-sm text-gray-700 bg-transparent outline-none w-full">
          <option>Job type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-[1px] h-10 bg-gray-200" />

      {/* Salary Slider */}
      <div className="flex flex-col flex-1 min-w-[220px]">
        <div className="flex justify-between text-sm text-black mb-1 font-semibold">
          <span>Salary Per Month</span>
          <span>
            ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
          </span>
        </div>
        <Range
          values={salaryRange}
          step={1}
          min={0}
          max={100}
          onChange={(values) => setSalaryRange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="w-full h-1 bg-gray-300 rounded relative mt-4"
              style={props.style}
            >
              <div
                className="absolute h-1 bg-black rounded"
                style={{
                  left: `${(salaryRange[0] / 100) * 100}%`,
                  width: `${((salaryRange[1] - salaryRange[0]) / 100) * 100}%`,
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props }) => {
            const { key, ...safeProps } = props;
            return (
              <div
                key={key}
                {...safeProps}
                className="w-4 h-4 bg-black rounded-full cursor-pointer flex items-center justify-center p-0 m-0"
                style={{
                  ...safeProps.style,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "none",
                  border: "none",
                  outline: "none",
                }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
