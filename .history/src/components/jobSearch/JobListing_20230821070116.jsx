import React from 'react';
import Job from './Job'; // Import the Job component
import jobData from './jobs.json'; // Import the job data

const JobListing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {jobData.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListing;
