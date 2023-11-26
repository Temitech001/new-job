import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar, FaDollarSign } from 'react-icons/fa'; // Import icons from react-icons

const Job = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
        <p className="text-gray-500">{job.company}</p>
        <p className="text-gray-600">
          <span className="mr-2">
            <FaMapMarkerAlt /> {job.location}
          </span>
          <span className="mr-2">
            <FaBriefcase /> {job.jobType}
          </span>
          <span className="mr-2">
            <FaCalendar /> {job.datePosted}
          </span>
          <span>
            <FaDollarSign /> {job.salaryRange}
          </span>
        </p>
        <p className="mt-2">{job.description}</p>
      </div>
    </div>
  );
};

export default Job;
