import React, { useContext } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar } from 'react-icons/fa';
import { AuthContext } from '../../components/server/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleApplyToJobClick = () => {
    console.log('Applied to job with ID:', job.id);
    navigate('/apply');
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-solid border-2 p-4">
      <div className="text-gray-800">
        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
        <p>{job.company}</p>
      </div>
      <div className="flex items-center mt-2">
        <FaMapMarkerAlt className="text-gray-500" />
        <span className="ml-2 text-gray-700">{job.location}</span>
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <p className="text-gray-800">
            <span className="bg-gray-100 px-2 py-1 rounded-lg">
              {job.salaryRange}
            </span>
          </p>
          <p className="text-gray-800 mt-2">
            <span className="bg-gray-100 px-2 py-1 rounded-lg">
              {job.jobType}
            </span>
          </p>
        </div>
        <div className="text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
          <FaCalendar className="inline-block mr-2" />
          {datePosted}
        </div>
      </div>
      <div className="mt-4 text-gray-800">
        <p>{job.description}</p>
      </div>
      <div className="flex justify-end mt-4">
        {user ? (
          <button
            onClick={handleApplyToJobClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Apply to Job
          </button>
        ) : (
          <p className="bg-red-200 text-gray-800 rounded-lg px-3 py-1 text-sm">
            Sign in to Apply
          </p>
        )}
      </div>
    </div>
  );
};

export default Job;
