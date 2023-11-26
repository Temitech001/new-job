import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server/firebase';

const ApplyJob = () => {
  // Get the jobId from the URL parameter
  const { jobId } = useParams();

  // State to store job details and application status
  const [jobData, setJobData] = useState(null); // State to store job details
  const [isApplying, setIsApplying] = useState(false);

  // Function to fetch job details based on jobId
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Create a reference to the job document in Firestore
        const jobDocRef = doc(db, 'jobList', jobId);

        // Get the job document
        const jobDocSnap = await getDoc(jobDocRef);

        if (jobDocSnap.exists()) {
          // If the job document exists, set the jobData state
          const data = jobDocSnap.data();
          setJobData(data);
        } else {
          // Handle the case where the job doesn't exist
          console.error('Job not found');
        }
      } catch (error) {
        console.error('Error fetching job details: ', error);
      }
    };

    // Fetch job details when the component mounts or when the jobId changes
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
    // Example: Call a function to submit the application data to Firestore
    // await submitJobApplication(formData); // Implement this function
  };

  return (
    <div>
      {jobData ? (
        <div>
          <h2 className="text-2xl font-semibold">{jobData.title}</h2>
          {/* Display job details here */}
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
