import React from 'react';

const Job = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
        <p className="text-gray-500">{job.company}</p>
        <p className="text-gray-600">{job.datePosted}</p>
        <p className="mt-2">{job.description}</p>
      </div>
      <div className="px-4 py-2 bg-gray-100 border-t border-gray-300">
        <p className="text-gray-600">
          Location: {job.location} | Salary: {job.salaryRange} | Job Type: {job.jobType}
        </p>
      </div>
    </div>
  );
};

export default Job;
