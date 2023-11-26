import React, { useContext } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar } from 'react-icons/fa';
import { AuthContext } from '../server/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { Timestamp } from 'firebase/firestore';


const getDaysAgo = (timestamp) => {
  // Convert Firestore Timestamp to JavaScript Date
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

  // Round the salaries to integers before formatting
  minSalary = Math.round(minSalary);
  maxSalary = Math.round(maxSalary);

  const formattedMinSalary = minSalary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Set minimumFractionDigits to 0 to remove decimal values
  });
  const formattedMaxSalary = maxSalary.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Set minimumFractionDigits to 0 to remove decimal values
  });

  return `${formattedMinSalary} - ${formattedMaxSalary}`;
};


const Job = ({ job }) => {
  const datePosted = getDaysAgo(job.datePosted);

  // Function to split description into sentences
  const splitDescription = (description) => {
    // Split the description into sentences using periods as delimiters
    const sentences = description.split('.');

    // Check if there's a last element (empty string) in the array and remove it
    if (sentences[sentences.length - 1].trim() === '') {
      sentences.pop();
    }

    return sentences;
  };

  const descriptionItems = splitDescription(job.description);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

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
            {formattedSalary}
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
              className="bg-blue-500 hover.bg-blue-600 text-white px-1.5 md:px-4 md:py-2 rounded"
            >
              Apply to Job
            </button>
          ) : (
            <Link to="si">
            <p className="text-gray-800 bg-red-200 rounded-lg p-2 text-center text-sm">Sign in to Apply</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
