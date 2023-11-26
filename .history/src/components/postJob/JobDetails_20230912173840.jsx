import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../server/firebase';
import Header from '../header/Header';

const JobDetails = () => {
  const { jobId } = useParams();
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
    workSchedule: '',
  });

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
    history.push(`/edit-job/${jobId}`);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
          <div>
            <p className="mb-4">
              <strong>Title:</strong> {jobData.title}
            </p>
            <p className="mb-4">
              <strong>Description:</strong> {jobData.description}
            </p>
            <p className="mb-4">
              <strong>Company:</strong> {jobData.company}
            </p>
            <p className="mb-4">
              <strong>Date Posted:</strong> {jobData.datePosted}
            </p>
            <p className="mb-4">
              <strong>Salary Range:</strong> ${jobData.salaryMin} - ${jobData.salaryMax}
            </p>
            <p className="mb-4">
              <strong>Job Type:</strong> {jobData.jobType}
            </p>
            <p className="mb-4">
              <strong>Location:</strong> {jobData.location}
            </p>
            <p className="mb-4">
              <strong>Work Schedule:</strong> {jobData.workSchedule}
            </p>
          </div>
          {/* Edit button */}
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
