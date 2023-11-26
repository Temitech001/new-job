import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../server/firebase';
import Header from '../header/Header';

const JobDetails = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    datePosted: '',
    salaryMin: 0,
    salaryMax: 0,
    jobType: '',
    location: 'Remote',
    tags: [],
    workSchedule: '',
    // Add other fields here
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalJobData, setOriginalJobData] = useState({}); // To store the original data

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDocRef = doc(db, 'jobList', jobId);
        const jobDocSnap = await getDoc(jobDocRef);

        if (jobDocSnap.exists()) {
          const data = jobDocSnap.data();
          setJobData(data);
          setOriginalJobData(data); // Store the original data
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
        tags: jobData.tags,
        workSchedule: jobData.workSchedule,
        // Add other fields here
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job details: ', error);
    }
  };

  const handleCancelEdit = () => {
    // Restore the original data when canceling edit
    setJobData(originalJobData);
    setIsEditing(false);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
          {isEditing ? (
            <form onSubmit={handleSaveClick}>
              {/* Job fields */}
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

              {/* Description */}
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

              {/* Company */}
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

              {/* Date Posted */}
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

              {/* Salary Minimum */}
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

              {/* Salary Maximum */}
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

              {/* Add other input fields here */}

              {/* Job Type */}
              <div className="mb-4">
                <label htmlFor="jobType" className="block text-gray-700 font-medium mb-2">
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={jobData.jobType}
                  onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  {/* <option value="Contract">Contract</option> */}
                  {/* <option value="Freelance">Freelance</option> */}
                  {/* <option value="Internship">Internship</option> */}
                  <option value="Temporary">Temporary</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={jobData.location}
                  onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>

              {/* Save and Cancel buttons */}
              <div className="mb-4 space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
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

              {/* Display other fields here */}
              <p className="mb-4">
                <strong>Job Type:</strong> {jobData.jobType}
              </p>
              <p className="mb-4">
                <strong>Location:</strong> {jobData.location}
              </p>
            </div>
          )}

          {/* Edit button */}
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
