import React, { useState } from 'react';
import Header from '../header/Header';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../server/firebase';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    datePosted: '',
    salaryRangeMin: 0, // Default value for minimum salary
    salaryRangeMax: 0, // Default value for maximum salary
    jobType: '',
    location: 'Remote',
  });

  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const description = value;
    const count = description.length;
    setCharCount(count);
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if both salaryRangeMin and salaryRangeMax are defined
      if (jobData.salaryRangeMin === 0 || jobData.salaryRangeMax === 0) {
        console.error('Both salaryRangeMin and salaryRangeMax must be defined');
        return;
      }

      // Add the job data to the 'jobList' collection
      const docRef = await addDoc(collection(db, 'jobList'), {
        title: jobData.title,
        description: jobData.description,
        company: jobData.company,
        datePosted: new Date(jobData.datePosted),
        salaryRangeMin: jobData.salaryRangeMin,
        salaryRangeMax: jobData.salaryRangeMax,
        jobType: jobData.jobType,
        location: jobData.location,
      });

      console.log('Document added with ID: ', docRef.id);

      // Reset the form after successful submission
      setJobData({
        title: '',
        description: '',
        company: '',
        datePosted: '',
        salaryRangeMin: 0,
        salaryRangeMax: 0,
        jobType: '',
        location: 'Remote',
      });
      setCharCount(0);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
          <form onSubmit={handleSubmit}>
            {/* ... (Other form fields) */}

            <div className="mb-4">
              <label htmlFor="salaryRange" className="block text-gray-700 font-medium mb-2">
                Salary Range: {`$${jobData.salaryRangeMin} - $${jobData.salaryRangeMax}`}
              </label>
              <input
                type="number"
                id="salaryRangeMin"
                name="salaryRangeMin"
                min="0"
                placeholder="Min Salary"
                value={jobData.salaryRangeMin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
              <input
                type="number"
                id="salaryRangeMax"
                name="salaryRangeMax"
                min="0"
                placeholder="Max Salary"
                value={jobData.salaryRangeMax}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none mt-2"
                required
              />
            </div>

            {/* ... (Other form fields) */}

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
