import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server/firebase';
import Header from '../header/Header';

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null); // State to store job details
  const [isApplying, setIsApplying] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Function to fetch job details based on jobId
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDocRef = doc(db, 'jobList', jobId);
        const jobDocSnap = await getDoc(jobDocRef);

        if (jobDocSnap.exists()) {
          const data = jobDocSnap.data();
          setJobData(data);
        } else {
          // Handle the case where the job doesn't exist
        }
      } catch (error) {
        console.error('Error fetching job details: ', error);
      }
    };

    // Simulate a loading delay and update loadingProgress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        fetchJobDetails();
      }
    }, 15);

  }, [jobId]);

  // Function to handle Apply button click
  const handleApplyClick = () => {
    setIsApplying(true);
  };

  // Function to handle Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the logic to submit the job application to Firestore here
    // You can use a function similar to handleSaveClick in your JobDetails component
    // After submission, you can show a success message or redirect the user to a confirmation page
  };

  return (
    <>
        <Header/>
        <div className="">
      {jobData ? (
        <div>
          <h2 className="text-2xl font-semibold">{jobData.title}</h2>
          {/* Display job details here */}
          <p className="text-lg font-semibold">{jobData.company}</p>
          <p className="text-md">Salary Range: ${jobData.salaryMin} - ${jobData.salaryMax}</p>
          <p className="text-md">Job Type: {jobData.jobType}</p>
          <p className="text-md">Location: {jobData.location}</p>
          <p className="text-md">Description: {jobData.description}</p>
          <p className="text-md">Support Email: support@job</p>
          <button onClick={handleApplyClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Apply
          </button>
        </div>
      ) : (
        <div className="my-8 relative mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <div className="w-64 h-4 bg-gray-200 rounded-lg mx-auto">
            <div
              className="w-full h-full bg-blue-500 rounded-lg"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {isApplying ? (
        <div>
          <h2 className="text-2xl font-semibold">Apply for {jobData.title}</h2>
          <form onSubmit={handleSubmit}>
            {/* Create your job application form fields here */}
            {/* Example: */}
            {/* <input type="text" name="name" placeholder="Your Name" required /> */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Submit Application
            </button>
          </form>
        </div>
      ) : null}
    </div>
    </>
  );
};

export default ApplyJob;
