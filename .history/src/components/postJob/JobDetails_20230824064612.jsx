// JobDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../server/firebase';

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
        datePosted: jobData.datePosted,
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
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Job Description (Max 160 characters):
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              rows="5"
              maxLength="160"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter job description..."
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={jobData.company}
              onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="datePosted" className="block text-gray-700 font-medium mb-2">
              Date Posted
            </label>
            <input
              type="date"
              id="datePosted"
              name="datePosted"
              value={jobData.datePosted}
              onChange={(e) => setJobData({ ...jobData, datePosted: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salaryMin" className="block text-gray-700 font-medium mb-2">
              Minimum Salary (USD)
            </label>
            <input
              type="number"
              id="salaryMin"
              name="salaryMin"
              min="0"
              max="90000"
              step="500"
              value={jobData.salaryMin}
              onChange={(e) => setJobData({ ...jobData, salaryMin: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salaryMax" className="block text-gray-700 font-medium mb-2">
              Maximum Salary (USD)
            </label>
            <input
              type="number"
              id="salaryMax"
              name="salaryMax"
              min="0"
              max="90000"
              step="500"
              value={jobData.salaryMax}
              onChange={(e) => setJobData({ ...jobData, salaryMax: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Job Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="jobType"
                  value="Part Time"
                  checked={jobData.jobType === 'Part Time'}
                  onChange={() => setJobData({ ...jobData, jobType: 'Part Time' })}
                  className="mr-2"
                />
                Part Time
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="jobType"
                  value="Full Time"
                  checked={jobData.jobType === 'Full Time'}
                  onChange={() => setJobData({ ...jobData, jobType: 'Full Time' })}
                  className="mr-2"
                />
                Full Time
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={jobData.location}
              onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            >
              <option value="Remote">Remote</option>
              {/* Add other location options if needed */}
            </select>
          </div>

          <div className="mb-4">
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </form>
      ) : (
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

      {!isEditing && <button onClick={handleEditClick}>Edit</button>}
    </div>
  );
};

export default JobDetails;
