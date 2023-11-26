import React, { useState } from 'react';
import Header from '../header/Header';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../server/firebase';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    description: '',
    datePosted: '',
    salaryMin: 0,
    salaryMax: 0,
    jobType: '',
    location: 'Remote',
    tags: [],
    currentTag: '', // New state to hold the current tag being typed
    workSchedule: '',
  });

  const [charCount, setCharCount] = useState(0);
  const [isPosting, setIsPosting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleTagInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  // Function to add a tag when Enter or comma is pressed
  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const { currentTag, tags } = jobData;
      if (currentTag.trim() !== '') {
        setJobData({
          ...jobData,
          tags: [...tags, currentTag.trim()],
          currentTag: '', // Clear the current tag input
        });
      }
    }
  };

  // Function to remove a tag
  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = jobData.tags.filter((tag) => tag !== tagToRemove);
    setJobData({
      ...jobData,
      tags: updatedTags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsPosting(true);

      // Add the job data to the 'jobList' collection
      const docRef = await addDoc(collection(db, 'jobList'), {
        title: jobData.title,
        company: jobData.company,
        description: jobData.description,
        datePosted: new Date(jobData.datePosted),
        salaryMin: parseFloat(jobData.salaryMin),
        salaryMax: parseFloat(jobData.salaryMax),
        jobType: jobData.jobType,
        location: jobData.location,
        tags: jobData.tags,
        workSchedule: jobData.workSchedule, // Include workSchedule
      });

      console.log('Document added with ID: ', docRef.id);

      // Reset the form after successful submission
      setJobData({
        title: '',
        company: '',
        description: '',
        datePosted: '',
        salaryMin: 0,
        salaryMax: 0,
        jobType: '',
        location: 'Remote',
        tags: [],
        currentTag: '',
      });
      setCharCount(0);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setIsPosting(false);
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
                onClick={() => setIsSuccess(false)}
                className="bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
              >
                Post Another Job
              </button>
              <Link to="/job-details">
                <button
                  className="bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 ml-4"
                >
                  View Job
                </button>
              </Link>
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

              <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={jobData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Job Description (Max 300 characters): {charCount}/300
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={jobData.description}
                  onChange={handleInputChange}
                  rows="8"
                  maxLength="300"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter job description..."
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="datePosted" className="block text-gray-700 font-medium mb-2">
                  Date Posted
                </label>
                <input
                  type="date"
                  id="datePosted"
                  name="datePosted"
                  value={jobData.datePosted}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="salaryRange" className="block text-gray-700 font-medium mb-2">
                  Salary Range (USD):
                </label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    id="salaryMin"
                    name="salaryMin"
                    min="0"
                    max="90000"
                    step="100"
                    value={jobData.salaryMin}
                    onChange={handleInputChange}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    id="salaryMax"
                    name="salaryMax"
                    min="0"
                    max="90000"
                    // step="100"
                    value={jobData.salaryMax}
                    onChange={handleInputChange}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Job Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jobType"
                      value="Part Time"
                      checked={jobData.jobType === 'Part Time'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Part Time
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jobType"
                      value="Full Time"
                      checked={jobData.jobType === 'Full Time'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Full Time
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="workSchedule" className="block text-gray-700 font-medium mb-2">
                  Work Schedule
                </label>
                <input
                  type="text"
                  id="workSchedule"
                  name="workSchedule"
                  value={jobData.workSchedule}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter work schedule"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                  Tags (Up to 5 tags, separated by commas)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="currentTag"
                  onKeyPress={handleTagInputKeyPress}
                  onChange={handleTagInputChange}
                  value={jobData.currentTag}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter tags separated by commas"
                />
                <div className="flex flex-wrap space-x-2">
                  {jobData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-200 text-blue-800 px-2 py-1 rounded-lg text-sm mr-2"
                    >
                      {tag}
                      <button
                        className="ml-1 text-red-600 hover:text-red-800"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  disabled={isPosting}
                >
                  {isPosting ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
