import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../server/firebase';
import Header from '../header/Header';

const JobDetails = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedJobData, setEditedJobData] = useState({}); // Store edited data

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

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedJobData(jobData); // Store the original data for editing
  };

  const handleSaveClick = async () => {
    try {
      const jobDocRef = doc(db, 'jobList', jobId);
      console.log('Job ID:', jobId);
      console.log('Edited Data:', editedJobData);
      await updateDoc(jobDocRef, editedJobData);
  
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job details: ', error);
    }
  };
  

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJobData({ ...editedJobData, [name]: value });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
          {isEditing ? (
            <form onSubmit={handleSaveClick}>
              {/* Render editable fields here */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedJobData.title}
                  onChange={handleInputChange}
                  // Add other input fields for editing
                />
              </div>
              {/* Add more editable fields here */}
              <div className="mb-4 space-x-4">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              {/* Display job details */}
              <p className="mb-4">
                <strong>Title:</strong> {jobData.title}
              </p>
              {/* Display other job details here */}
              <button
                onClick={handleEditClick}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
