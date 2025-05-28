import React from 'react';
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function JobCards({job}) {
  dayjs.extend(relativeTime);  
  return (
    <div className="w-[316px] h-[320px] bg-white rounded-[12px] shadow-[0_0_14px_rgba(211,211,211,0.15)] p-5 flex flex-col justify-between">
      <div>
        {/* Top: Logo + Time */}
        <div className="flex justify-between items-start">
          <div className="w-[83.46px] h-[82px] rounded-[13.18px] border border-white bg-gradient-to-b from-[#FEFEFD] to-[#F1F1F1] shadow-[0px_0px_10.25px_rgba(148,148,148,0.25)] flex items-center justify-center">
            <img
              src={`/logo/${job.companyName.toLowerCase()}.png`}
              alt={job.companyName}
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-xs bg-blue-100 text-black font-medium px-2 py-0.5 rounded">
            {dayjs(job.createdAt).fromNow()}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-xl font-bold mt-3 mb-4 text-black">
          {job.jobTitle}
        </h3>

        {/* Job Details Row */}
        <div className="flex text-base text-gray-600 mt-2 space-x-3">
          <span className="flex items-center gap-1">
            👤 {job.experience} yr Exp
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            ₹{(job.salaryMax / 100000).toFixed(0)}LPA
          </span>
        </div>

        {/* Description Bullets */}
        <ul className="text-sm text-[#555555] mt-3 list-disc ml-5 space-y-1">
          <li>{job.jobDescription}</li>
          <li>{job.responsibility}</li>
        </ul>
      </div>

      {/* Apply Button */}
      <button className="mt-4 w-full bg-[#00aaff] hover:bg-[#0099dd] text-white rounded-[10px] py-2 text-sm font-medium">
        Apply Now
      </button>
    </div>
  );
}
