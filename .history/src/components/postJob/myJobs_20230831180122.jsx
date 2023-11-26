import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../server/firebase';

const MyJobs = () => {
  const [jobList, setJobList] = useState([]);

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
      } catch (error) {
        console.error('Error fetching job data from Firestore:', error);
      }
    };

    fetchJobsFromFirestore();
  }, []);

  const handleDeleteJob = async (id) => {
    try {
      // Construct a reference to the job document
      const jobDocRef = doc(db, 'jobList', id);

      // Delete the job document
      await deleteDoc(jobDocRef);

      // Remove the deleted job from the state
      setJobList((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting job from Firestore:', error);
    }
  };

  return (
    <div>
      <h1>My Jobs</h1>
      <ul>
        {jobList.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
            {/* Add an Edit button and functionality here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyJobs;
