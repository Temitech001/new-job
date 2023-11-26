import React, { useState, useEffect } from 'react';
import Job from './Job';
import { db } from '../server/firebase'; // Import your Firebase db

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedJobs, setDisplayedJobs] = useState(9);
  const [jobs, setJobs] = useState([]); // State to store job data

  // Function to fetch jobs from Firestore
  const fetchJobs = async () => {
    try {
      const jobCollection = db.collection('jobList'); // Reference to your "jobList" collection
      const jobSnapshot = await jobCollection.get();
      const jobData = jobSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobData);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when the component mounts
  }, []);

  // Filtering and searching logic remains the same

  // ...

  return (
    <div>
      {/* Search Input */}
      {/* ... */}

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:px-20 mx-auto">
        {jobs
          .filter((job) => {
            const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const descriptionMatch = job.description.toLowerCase().includes(searchTerm.toLowerCase());
            return titleMatch || descriptionMatch;
          })
          .slice(0, displayedJobs)
          .map((job) => (
            <Job key={job.id} job={job} />
          ))}
      </div>

      {/* Load More Button */}
      {/* ... */}
    </div>
  );
};

export default JobListing;
