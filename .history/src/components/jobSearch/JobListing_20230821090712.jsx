import React, { useState } from 'react';
import Job from './Job'; // Import the Job component
import jobData from './Jobs.json'; // Import the job data

const JobListing = () => {

    const [displayedJobs, setDisplayedJobs] = useState(9);

    const loadMoreJobs = () => {
        setDisplayedJobs(displayedJobs + 9); // Increase the number of displayed jobs
    };

    const [locationFilter, setLocationFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [filteredJobs, setFilteredJobs] = useState(jobData);

    // Handle changes in the location filter input
    const handleLocationFilterChange = (e) => {
        setLocationFilter(e.target.value);
        filterJobs(titleFilter, e.target.value);
    };

    // Handle changes in the title/keywords filter input
    const handleTitleFilterChange = (e) => {
        setTitleFilter(e.target.value);
        filterJobs(e.target.value, locationFilter);
    };

    // Filter jobs based on location and title/keywords
    const filterJobs = (title, location) => {
        const filtered = jobData.filter((job) => {
            // Check if the job title contains the filter text
            const titleMatch = job.title.toLowerCase().includes(title.toLowerCase());

            // Check if the location contains the filter text
            const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());

            return titleMatch && locationMatch;
        });

        setFilteredJobs(filtered);
    };

    return (
        <div>
        {/* Filter Inputs */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={handleLocationFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Filter by job title or keywords"
            value={titleFilter}
            onChange={handleTitleFilterChange}
            className="border p-2 rounded ml-4"
          />
        </div>
  
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
