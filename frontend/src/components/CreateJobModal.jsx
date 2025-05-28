import React,{useEffect, useRef} from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ArrowRight, Calendar } from "lucide-react"; 
import { api } from '../services/api';

const schema = z.object({
  jobTitle: z.string().min(3, "At least 3 characters"),
  companyName: z.string().min(2, "Required"),
  location: z.string().optional(),
  jobType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
  ]),
  minSalary: z.string().regex(/^\d*$/, "Numbers only").optional(),
  maxSalary: z.string().regex(/^\d*$/, "Numbers only").optional(),
  deadline: z.string().optional(),
  experience: z.string().regex(/^\d*$/, "Numbers only").optional(),
  requirements: z.string().max(200, "Too long").optional(),
  description: z.string().max(5000, "Too long").optional(),
});

// const isoDate = (d) => (!d ? "" : new Date(d).toISOString().slice(0, 10));

export default function CreateJobModal({ isOpen, onClose}) {

    /* ----- react-hook-form ------------------------------------------- */
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        jobTitle: "",
        companyName: "",
        location: "",
        jobType: "Full-time",
        minSalary: "",
        maxSalary: "",
        deadline: "",
        description: "",
      },
    });

    const modalRef = useRef(null);

    /* ----- esc-key closes modal -------------------------------------- */
    useEffect(() => {
      const handleEsc = (e) => e.key === "Escape" && onClose();
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEsc);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

    

    const submitPublish = (data) => {
      api.post("/", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error("Error fetching jobs:", err));
      reset();
      onClose();
    };

    // const onSubmit = (data) => {
    //   console.log("Form Data:", data);
    //   // You can POST this data to your backend
    //   onClose(); // close the modal
    //   reset(); // reset the form
    // };

    const deadlineRef = useRef(null);
    
    if (!isOpen) return null;

    /* ----- ui --------------------------------------------------------- */
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
        <div ref={modalRef} className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-center text-black mb-8">
            Create Job Opening
          </h2>
          <form
            onSubmit={handleSubmit(submitPublish)}
            className="grid grid-cols-2 gap-4"
          >
            {/* Job Title */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-black mb-1">
                Job Title
              </label>
              <input
                placeholder="Job Title"
                {...register("jobTitle")}
                className="border h-[48px] text-black border-black rounded-md px-4 py-2 w-full text-sm"
              />
            </div>
            {/* Company Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#636363] mb-1">
                Company Name
              </label>
              <input
                placeholder="Amazon, Microsoft, Swiggy"
                {...register("companyName")}
                className="border border-[#636363] h-[48px] rounded-md px-4 text-black py-2 w-full text-sm"
              />
            </div>
            {/* Location */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#636363] mb-1">
                Location
              </label>
              <div className="relative">
                <select
                  {...register("location")}
                  className="border h-[48px] border-[#D1D5DB] rounded-md px-4 py-2 w-full text-sm appearance-none text-[#9CA3AF]" // Adjusted border and text color
                >
                  <option value="">Choose Preferred Location</option>
                  <option value="Remote">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Remote">Remote</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* Job Type */}
            <div className="flex flex-col">
              {/* Added flex container for label and select */}
              <label className="text-sm font-medium text-[#636363] mb-1">
                Job Type
              </label>
              <div className="relative">
                <select
                  {...register("jobType")}
                  className="border border-[#D1D5DB] h-[48px] rounded-md px-4 py-2 w-full text-sm appearance-none text-[#9CA3AF]"
                >
                  <option value="Full-time">FullTime</option>
                  <option value="Part-time">PartTime</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* Salary Range - Min */}
            <div className="flex flex-col">
              {" "}
              {/* Wrapper for label and inputs */}
              <label className="text-sm font-medium text-[#636363] mb-1">
                Salary Range
              </label>
              <div className="flex gap-4">
                {" "}
                {/* Container for min/max salary inputs */}
                {/* Salary Range - Min */}
                <div className="relative flex-1">
                  {/* flex-1 to make it take available space */}
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    {...register("minSalary")}
                    className="border border-[#D1D5DB] rounded-md pl-6 pr-3 py-2 w-full text-sm text-black" // Adjusted border and text color
                  />
                </div>
                {/* Salary Range - Max */}
                <div className="relative flex-1">
                  {/* flex-1 to make it take available space */}
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="12,00,000"
                    {...register("maxSalary")}
                    className="border border-[#D1D5DB] rounded-md pl-6 pr-3 py-2 w-full text-sm text-black" // Adjusted border and text color
                  />
                </div>
              </div>
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#636363] mb-1">
                Application Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="deadline"
                  placeholder="YYYY-MM-DD"
                  {...register("deadline")}
                  ref={deadlineRef}
                  className="border border-[#D1D5DB] rounded-md px-4 py-2 w-full text-sm text-[#111827] pr-10 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() =>
                    deadlineRef.current?.showPicker?.() ||
                    deadlineRef.current?.focus()
                  }
                >
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9CA3AF]" />
                </button>
              </div>
            </div>
            {/* Experience */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#636363] mb-1">
                Experience
              </label>
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="0"
                  {...register("experience")}
                  className="border h-[48px] text-black border-black rounded-md px-4 py-2 w-full text-sm"
                />
                <span className="absolute left-16 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  Years
                </span>
              </div>
            </div>
            {/* Requirement */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#636363] mb-1">
                Requirements
              </label>
              <input
                placeholder="Java, C++, Python"
                {...register("requirements")}
                className="border border-[#636363] h-[48px] rounded-md px-4 text-black py-2 w-full text-sm"
              />
            </div>
            {/* Description */}
            <div className="flex flex-col col-span-2">
              <label className="text-sm font-medium text-[#636363] mb-2">
                Description
              </label>
              <textarea
                placeholder="Please share a description to let the candidate know more about the job role"
                {...register("description")}
                className="border border-[#D1D5DB] text-black rounded-md px-4 py-2 w-full text-sm h-24 resize-none mt-0"
              />
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-between items-center mt-6">
              <button
                type="button"
                className="border-[1.5px] border-[#222222] text-black rounded-[10px] flex items-center gap-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-4 pb-4 px-[60px]"
              >
                Save Draft <ChevronDown className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="bg-[#00AAFF] text-white cursor-pointer rounded-[10px] flex items-center gap-[10px] pt-4 pb-4 px-[60px]"
              >
                Publish <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
