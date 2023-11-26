import React, { useState, useEffect } from 'react';
import Job from './Job';
import { db } from '../server/firebase';

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState(9);

  useEffect(() => {
    // Fetch job listings from Firestore
    const fetchJobs = async () => {
      try {
        const jobsRef = db.collection('jobList');
        const snapshot = await jobsRef.get();

        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        const jobListings = [];
        snapshot.forEach((doc) => {
          const jobData = doc.data();
          jobListings.push({
            id: doc.id,
            ...jobData,
          });
        });

        setJobs(jobListings);
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setDisplayedJobs(9);
  };

  const loadMoreJobs = () => {
    setDisplayedJobs(displayedJobs + 9);
  };

  return (
    <div>
      <div className="mb-4 mt-8 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={() => {} /* Handle Find Job click */}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-4"
        >
          Find Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:px-20 mx-auto">
        {filteredJobs.slice(0, displayedJobs).map((job) => (
          <Job key={job.id} jobId={job.id} />
        ))}
      </div>

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
