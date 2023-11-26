import React, { useState } from 'react';
import Job from './Job'; // Import the Job component
import jobData from './Jobs.json'; // Import the job data

const JobListing = () => {

    const [displayedJobs, setDisplayedJobs] = useState(9);

    const loadMoreJobs = () => {
      setDisplayedJobs(displayedJobs + 9); // Increase the number of displayed jobs
    };

  return (
    <div className=" container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 px-20 mx-auto">
      {jobData.slice(0, displayedJobs).map((job) => (
        <Job key={job.id} job={job} />
      ))}

    {displayedJobs < jobData.length && (
        <div className="text-center">
          <button
            onClick={loadMoreJobs}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 mx-auto"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListing;
