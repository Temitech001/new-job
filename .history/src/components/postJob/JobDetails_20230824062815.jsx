// JobDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // You may need to adjust this import depending on your routing setup
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../server/firebase';

const JobDetails = () => {
  const { jobId } = useParams(); // Get the job ID from the URL
  const history = useHistory();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    datePosted: '',
    salaryMin: 0,
    salaryMax: 0,
    jobType: '',
    location: 'Remote',
  });
  const [isEditing, setIsEditing] = useState(false);

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
  };

  const handleSaveClick = async () => {
    try {
      const jobDocRef = doc(db, 'jobList', jobId);
      await updateDoc(jobDocRef, {
        title: jobData.title,
        description: jobData.description,
        company: jobData.company,
        salaryMin: parseFloat(jobData.salaryMin),
        salaryMax: parseFloat(jobData.salaryMax),
        jobType: jobData.jobType,
        location: jobData.location,
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job details: ', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
      {isEditing ? (
        // Render editable fields when editing is enabled
        <form>
          {/* Render editable fields here, similar to the PostJob component */}
          {/* You can reuse the input fields and styling */}
          {/* Add "value={jobData.fieldName}" and "onChange" handlers */}
        </form>
      ) : (
        // Render job details when not in edit mode
        <div>
          <p>Title: {jobData.title}</p>
          <p>Description: {jobData.description}</p>
          <p>Company: {jobData.company}</p>
          <p>Date Posted: {jobData.datePosted}</p>
          <p>Salary Range: ${jobData.salaryMin} - ${jobData.salaryMax}</p>
          <p>Job Type: {jobData.jobType}</p>
          <p>Location: {jobData.location}</p>
        </div>
      )}

      {isEditing ? (
        // Render "Save" and "Cancel" buttons when editing
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        // Render "Edit" button when not in edit mode
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default JobDetails;
