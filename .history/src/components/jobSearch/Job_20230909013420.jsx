import React, { useContext } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar } from 'react-icons/fa';
import { AuthContext } from '../server/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

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

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const Job = ({ job }) => {
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

  // Function to handle Apply to Job button click
  const handleApplyToJobClick = (jobId) => {
    console.log(`Clicked Apply to Job for Job ID: ${jobId}`);
    // Navigate to another page (replace 'your-path' with the actual path)
    navigate(`/apply-job/${jobId}`);
  };

  const formattedSalary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-solid border-2 p-2">
      <div className="p-4 text-left">
        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
        <p className="text-gray-800">{job.company}</p>
        <p className="text-gray-800">
          <FaMapMarkerAlt className="inline-block mr-2" />
          {job.location}
        </p>
        <div className='flex'>
          <p className="text-gray-800 mr-4 bg-gray-100 p-2 rounded-lg">
            {formattedSalary}
          </p>
          <p className='text-gray-800 bg-gray-100 rounded-lg p-2'>
            <FaBriefcase className="inline-block mr-2" />
            {job.jobType}
          </p>
        </div>
        <div className="mt-2">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              style={{ backgroundColor: getRandomColor() }} // Set random background color
              className="text-white px-2 py-1 rounded-lg text-sm mr-2"
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
          <p className="text-gray-800 bg-gray-100 rounded-lg p-2 text-center text-sm">
            <FaCalendar className="inline-block mr-2" />
            {datePosted}
          </p>
          {user ? (
            <button
              onClick={() => handleApplyToJobClick(job.id)} // Handle Apply to Job button click
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
    </div>
  );
};

export default Job;
