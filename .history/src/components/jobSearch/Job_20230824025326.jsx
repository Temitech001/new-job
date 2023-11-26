import React, { useContext, useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar } from 'react-icons/fa';
import { AuthContext } from '../../components/server/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { db } from '../server/firebase';

const getDaysAgo = (dateString) => {
  const currentDate = new Date();
  const postedDate = new Date(dateString);
  const timeDifference = currentDate - postedDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
  return `Posted ${daysAgo} days ago`;
};

const Job = ({ job }) => {
  const datePosted = getDaysAgo(job.datePosted);
  const descriptionItems = job.description.split('\n');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle Apply to Job button click
  const handleApplyToJobClick = (jobId) => {
    console.log(`Clicked Apply to Job for Job ID: ${jobId}`);
    // Navigate to another page (replace 'your-path' with the actual path)
    navigate(`/apply-job/${jobId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-solid border-2 p-2">
      <div className="p-4 text-left">
        <h2 className="text-xl font-semibold text-gray-900">
          {job.title}
        </h2>
        <p className="text-gray-800">
          {job.company}
        </p>
        <p className="text-gray-800">
          <FaMapMarkerAlt className="inline-block mr-2" />
          {job.location}
        </p>
        <div className='flex'>
          <p className="text-gray-800 mr-4 bg-gray-100 p-2 rounded-lg">
            {job.salaryRange}
          </p>
          <p className='text-gray-800 bg-gray-100 rounded-lg p-2'>
            <FaBriefcase className="inline-block mr-2" />
            {job.jobType}
          </p>
        </div>
        <ul className="mt-2 list-disc text-gray-600">
          {descriptionItems.map((item, index) => (
            <li key={index} className="list-disc ml-6">
              {item}
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-2">
          <p className="text-gray-800 bg-gray-100 rounded-lg p-2 text-center text-sm">
            <FaCalendar className="inline-block mr-2" />
            {datePosted}
          </p>
          {user ? (
            <button
              onClick={() => handleApplyToJobClick(job.id)} // Handle Apply to Job button click
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply to Job
            </button>
          ) : (
            <p className="text-gray-800 bg-red-200 rounded-lg p-2 text-center text-sm">Sign in to Apply</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
