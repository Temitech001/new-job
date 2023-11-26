import React, { useContext } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar, FaClock } from 'react-icons/fa';
import { AuthContext } from '../server/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// import { deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions
// import { db } from '../server/firebase'; // Import your Firebase db object

const getDaysAgo = (timestamp) => {
  const datePosted = timestamp.toDate();
  const currentDate = new Date();
  const timeDifference = currentDate - datePosted;
  const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
  return `Posted ${daysAgo} days ago`;
};

const formatSalary = (minSalary, maxSalary) => {
  if (minSalary === undefined || maxSalary === undefined) {
    return 'Salary not specified';
  }

  minSalary = Math.round(minSalary);
  maxSalary = Math.round(maxSalary);

  const formattedMinSalary = minSalary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  const formattedMaxSalary = maxSalary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return `${formattedMinSalary} - ${formattedMaxSalary}`;
};

const Job = ({ job, onDelete }) => {
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

  const handleEditJobClick = (jobId) => {
    console.log(`Clicked Edit Job for Job ID: ${jobId}`);
    navigate(`/edit-job/${jobId}`);
  };

  const isUserAuthorized = user && user.email === 'jobconnect360site@gmail.com';

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-solid border-2 p-2 relative">
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
        {job.workSchedule && ( // Check if workSchedule exists
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
          {user ? (
            <button
              onClick={() => handleApplyToJobClick(job.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-1.5 md:px-4 md:py-2 rounded"
            >
              Apply to Job
            </button>
          ) : (
            <Link to="signin">
              <p className="text-gray-800 bg-red-200 rounded-lg p-2 text-center text-sm">Sign in to Apply</p>
            </Link>
          )}
        </div>
      </div>
      {isUserAuthorized && (
        < div className="bottom-2 flex justify-between ab">
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-2 md:px-4 md:py-2 rounded left-2"
        >
          Delete
        </button>
        <button
          onClick={onDelete}
          className="bg-green-500 hover:bg-green-600 text-white px-2 md:px-4 md:py-2 rounded right-2"
        >
          Edit
        </button>
        </div>
      )}
    </div>
  );
};

export default Job;
