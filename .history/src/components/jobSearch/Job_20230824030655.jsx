import React, { useContext, useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaCalendar } from 'react-icons/fa';
import { AuthContext } from '../../components/server/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../server/firebase'; // Make sure this path is correct

const getDaysAgo = (dateString) => {
  const currentDate = new Date();
  const postedDate = new Date(dateString);
  const timeDifference = currentDate - postedDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
  return `Posted ${daysAgo} days ago`;
};

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        const companyCollection = db.collection('jobList'); // Replace 'company' with your collection name
        const querySnapshot = await companyCollection.get();
        const jobData = [];
        querySnapshot.forEach((doc) => {
          jobData.push({ id: doc.id, ...doc.data() });
        });
        setJobs(jobData);
      } catch (error) {
        console.error('Error fetching company jobs:', error);
      }
    };

    fetchCompanyJobs();
  }, []);

  const handleApplyToJobClick = (jobId) => {
    console.log(`Clicked Apply to Job for Job ID: ${jobId}`);
    navigate(`/apply-job/${jobId}`);
  };

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden border-solid border-2 p-2">
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
                Salary Range: ${job.salaryMin} - ${job.salaryMax}
              </p>
              <p className='text-gray-800 bg-gray-100 rounded-lg p-2'>
                <FaBriefcase className="inline-block mr-2" />
                {job.jobType}
              </p>
            </div>
            <p className="text-gray-800 bg-gray-100 rounded-lg p-2 text-center text-sm">
              <FaCalendar className="inline-block mr-2" />
              {getDaysAgo(job.datePosted)}
            </p>
            <p className="text-gray-800 bg-gray-100 rounded-lg p-2 text-center text-sm">
              Description: {job.description}
            </p>
            {user ? (
              <button
                onClick={() => handleApplyToJobClick(job.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Apply to Job
              </button>
            ) : (
              <p className="text-gray-800 bg-red-200 rounded-lg p-2 text-center text-sm">Sign in to Apply</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyJobs;
