import React, { useState } from 'react';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    datePosted: '',
    salaryRange: '',
    jobType: '',
    location: 'Remote', // Default to 'Remote'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to generate a unique ID and save jobData to JSON file
    // Reset the form after submission
    setJobData({
      title: '',
      description: '',
      company: '',
      datePosted: '',
      salaryRange: '',
      jobType: '',
      location: 'Remote',
    });
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleInputChange}
          />
        </label>
        {/* Add similar input fields for other job details */}
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
