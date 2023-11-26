import React, { useContext, useState } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../server/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


const Job = ({ job, onDelete, onEdit }) => {
  const datePosted = getDaysAgo(job.datePosted);

  const splitDescription = (description) => {
    const sentences = description.split('.');
    if (sentences[sentences.length - 1].trim() === '') {
      sentences.pop();
    }
    return sentences;
  };

  const descriptionItems = splitDescription(job.description);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const formattedSalary = formatSalary(job.salaryMin, job.salaryMax);

  const handleApplyToJobClick = (jobId) => {
    console.log(`Clicked Apply to Job for Job ID: ${jobId}`);
    navigate(`/apply-job/${jobId}`);
  };

  const handleEditClick = () => {
    onEdit(job.id); // Pass the job ID to the parent component for editing
  };

  const handleDeleteClick = () => {
    onDelete(job.id); // Pass the job ID to the parent component for deletion
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-solid border-2 p-2">
      <div className="p-4 text-left">
        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
        <p className="text-gray-800">{job.company}</p>
        <p className="text-gray-800">
          <FaMapMarkerAlt className="inline-block mr-2" />
          {job.location}
        </p>
        <div className="flex">
          <p className="text-gray-800 mr-4 bg-gray-100 p-2 rounded-lg">{formattedSalary}</p>
          <p className="text-gray-800 bg-gray-100 rounded-lg p-2 flex items-center">
            <FaBriefcase className="inline-block mr-2" />
            {job.jobType}
          </p>
        </div>
        {job.workSchedule && (
          <p className="text-gray-800 bg-gray-100 rounded-lg p-2 flex items-center mt-2">
            <FaClock className="inline-block mr-2" />
            {job.workSchedule}
          </p>
        )}
        <div className="mt-2 capitalize">
          {job.tags &&
            job.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg text-sm md:text-base mr-2 mb-2 inline-block"
              >
                {tag}
              </span>
            ))}
        </div>
        <ul className="mt-2 list-disc text-gray-600">
          {descriptionItems.map((item, index) => (
            <li key={index} className="list-disc ml-6">
              {item}
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-2">
          <p className="text-gray-800 bg-gray-100 rounded-lg p-2 text-center text-sm flex items-center">
            <FaCalendar className="inline-block mr-2" />
            {datePosted}
          </p>
          {user && user.email === 'jobconnect360site@gmail.com' && (
            <div>
              <button
                onClick={() => handleApplyToJobClick(job.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-1.5 md:px-4 md:py-2 rounded mr-2"
              >
                Apply to Job
              </button>
              <button
                onClick={handleEditClick}
                className="bg-green-500 hover:bg-green-600 text-white px-1.5 md:px-4 md:py-2 rounded mr-2"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 hover:bg-red-600 text-white px-1.5 md:px-4 md:py-2 rounded"
              >
                <FaTrash /> Delete
              </button>
            </div>
          )}
          {user && user.email !== 'jobconnect360site@gmail.com' && (
            <button
              onClick={() => handleApplyToJobClick(job.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-1.5 md:px-4 md:py-2 rounded"
            >
              Apply to Job
            </button>
          )}
          {!user && (
            <Link to="signin">
              <p className="text-gray-800 bg-red-200 rounded-lg p-2 text-center text-sm">Sign in to Apply</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
