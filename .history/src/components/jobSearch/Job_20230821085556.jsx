import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar, FaDollarSign } from 'react-icons/fa'; // Import icons from react-icons

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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-solid border-2 p-2 m">
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
        <p className="text-gray-800">
          <FaCalendar className="inline-block mr-2" />
          {datePosted}
        </p>
      </div>
    </div>
  );
};

export default Job;
