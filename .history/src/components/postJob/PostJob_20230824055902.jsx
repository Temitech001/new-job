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
    salaryMin: 0,
    salaryMax: 0,
    jobType: '',
    location: 'Remote',
  });

  const [charCount, setCharCount] = useState(0);
  const [isPosting, setIsPosting] = useState(false); // State for posting animation
  const [isSuccess, setIsSuccess] = useState(false); // State for success message

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
      setIsPosting(true); // Start posting animation

      // Add the job data to the 'jobList' collection
      const docRef = await addDoc(collection(db, 'jobList'), {
        title: jobData.title,
        description: jobData.description,
        company: jobData.company,
        datePosted: new Date(jobData.datePosted),
        salaryMin: parseFloat(jobData.salaryMin),
        salaryMax: parseFloat(jobData.salaryMax),
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
        salaryMin: 0,
        salaryMax: 0,
        jobType: '',
        location: 'Remote',
      });
      setCharCount(0);
      setIsSuccess(true); // Show success message
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setIsPosting(false); // Stop posting animation
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
          {isSuccess ? (
            <div className="text-green-500 text-center">
              <p>Job Posted Successfully!</p>
              <button
                onClick={() => setIsSuccess(false)} // Hide success message
                className="bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
              >
                Post Another Job
              </button>
              <button
                onClick={() => {
                  // Redirect to the job details page or edit job page
                  // Add the appropriate route or logic here
                }}
                className="bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 ml-4"
              >
                View Job
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={jobData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>
              {/* Other form fields */}
              {/* ... */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  disabled={isPosting} // Disable the button during posting animation
                >
                  {isPosting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostJob;
