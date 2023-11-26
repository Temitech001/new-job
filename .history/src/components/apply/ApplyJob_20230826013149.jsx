import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server/firebase';

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null); // State to store job details
  const [isApplying, setIsApplying] = useState(false);

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

    fetchJobDetails();
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
    <div>
      {jobData ? (
        <div>
          <h2 className="text-2xl font-semibold">{jobData.title}</h2>
          {/* Display job details here */}
          {/* You can use a similar format as in your JobDetails component */}
          <p>{jobData.company}</p>
          {/* Display other job details */}
          {/* ... */}
          <button onClick={handleApplyClick}>Apply</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {isApplying ? (
        <div>
          <h2 className="text-2xl font-semibold">Apply for {jobData.title}</h2>
          <form onSubmit={handleSubmit}>
            {/* Create your job application form fields here */}
            {/* Example: */}
            {/* <input type="text" name="name" placeholder="Your Name" required /> */}
            <button type="submit">Submit Application</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ApplyJob;
