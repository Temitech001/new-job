import React, { useState } from 'react';
import Job from './Job'; // Import the Job component
import jobData from './Jobs.json'; // Import the job data

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedJobs, setDisplayedJobs] = useState(9);

  const filteredJobs = jobData.filter((job) => {
    // Check if the job title or description contains the search term
    const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = job.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Display the job if either the title or description matches the search term
    return titleMatch || descriptionMatch;
  });

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setDisplayedJobs(9); // Reset the displayed jobs when the search term changes
  };

  // Load more jobs
  const loadMoreJobs = () => {
    setDisplayedJobs(displayedJobs + 9); // Increase the number of displayed jobs
  };

  // Handle Find Job button click
  const handleFindJobClick = () => {
    // Perform any action you want when the "Find Job" button is clicked
    // For example, you can display a modal, navigate to a new page, or perform a search
    console.log('Find Job button clicked');
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4 mt-8 flex items-center">
        <input
          type="text"
          placeholder="Search by title or keywords"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded flex-grow w-"
        />
        <button
          onClick={handleFindJobClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-4"
        >
          Find Job
        </button>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:px-20 mx-auto">
        {filteredJobs.slice(0, displayedJobs).map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </div>

      {/* Load More Button */}
      {displayedJobs < filteredJobs.length && (
        <div className="text-center">
          <button
            onClick={loadMoreJobs}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListing;
