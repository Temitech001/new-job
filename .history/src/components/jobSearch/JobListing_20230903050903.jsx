import React, { useState, useEffect } from 'react';
import Job from './Job';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../server/firebase'; // Import your Firebase db object

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedJobs, setDisplayedJobs] = useState(9);
  const [jobList, setJobList] = useState([]); // Store the fetched job data in state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch job data from Firestore when the component mounts
    const fetchJobsFromFirestore = async () => {
      try {
        const jobListRef = collection(db, 'jobList');
        const querySnapshot = await getDocs(jobListRef);
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobList(jobsData);
        setIsLoading(false); // Turn off loading state when data is fetched
      } catch (error) {
        console.error('Error fetching job data from Firestore:', error);
        setIsLoading(false); // Turn off loading state in case of an error
      }
    };

    fetchJobsFromFirestore();
  }, []);

  const filteredJobs = jobList.filter((job) => {
    // Check if the job title or description contains the search term
    const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = job.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Display the job if either the title or description matches the search term
    return titleMatch || descriptionMatch;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setDisplayedJobs(9);
  };

  const loadMoreJobs = () => {
    setDisplayedJobs(displayedJobs + 9);
  };

  const handleFindJobClick = () => {
    console.log('Find Job button clicked');
  };

  return (
    <div>
      <div className="mb-4 mt-8 flex items-center justify-center pb-">
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={handleFindJobClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-4"
        >
          Find Job
        </button>
      </div>

      {isLoading ? ( // Display loading animation when isLoading is true
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        // Display jobs when isLoading is false
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:px-20 mx-auto">
          {filteredJobs.slice(0, displayedJobs).map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>
      )}

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
