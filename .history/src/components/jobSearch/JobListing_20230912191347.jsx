import React, { useState, useEffect } from 'react';
import Job from './Job';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../server/firebase';
import './JobListing.css'; // Import the CSS styles

const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedJobs, setDisplayedJobs] = useState(9);
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobsFromFirestore = async () => {
      try {
        const jobListRef = collection(db, 'jobList');
        const querySnapshot = await getDocs(jobListRef);
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobList(jobsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job data from Firestore:', error);
        setIsLoading(false);
      }
    };

    fetchJobsFromFirestore();
  }, []);

  const filteredJobs = jobList.filter((job) => {
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

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteDoc(doc(db, 'jobList', jobId));
      setJobList((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="job-listing">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleFindJobClick} className="find-job-button">
          Find Job
        </button>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="job-grid">
          {filteredJobs.slice(0, displayedJobs).map((job) => (
            <Job key={job.id} job={job} onDelete={() => handleDeleteJob(job.id)} />
          ))}
        </div>
      )}

      {displayedJobs < filteredJobs.length && (
        <div className="load-more-button">
          <button onClick={loadMoreJobs} className="load-more-button-inner">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListing;
