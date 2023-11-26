import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, folder1Ref, folder2Ref, folder3Ref } from '../server/firebase';
import Header from '../header/Header';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

let localStorageUpdateTimeout;

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [formData, setFormData] = useState({
    fullName: localStorage.getItem('fullName') || '',
    email: localStorage.getItem('email') || '',
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    coverLetter: localStorage.getItem('coverLetter') || '',
    cvFile: null, // Initialize cvFile as null
    driverLicense: null,
    ssnCopy: null,
  });

  // Function to handle file input changes
  const handleFileInputChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, [fieldName]: file }));
  };

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    clearTimeout(localStorageUpdateTimeout);
    localStorageUpdateTimeout = setTimeout(() => {
      localStorage.setItem(name, value);
    }, 1000);
  };

  

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDocRef = doc(db, 'jobList', jobId);
        const jobDocSnap = await getDoc(jobDocRef);

        if (jobDocSnap.exists()) {
          const data = jobDocSnap.data();
          setJobData(data);
        } else {
          // Handle the case where the job doesn't exist
        }
      } catch (error) {
        console.error('Error fetching job details: ', error);
      }
    };

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        fetchJobDetails();
      }
    }, 15);
  }, [jobId]);

  return (
    <>
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 mx-auto mt-4">
        {jobData ? (
          <div>
            <h2 className="text-2xl font-semibold">{jobData.title}</h2>
            <p className="text-md">Company: {jobData.company}</p>
            <p className="text-md">Salary Range: ${jobData.salaryMin} - ${jobData.salaryMax}</p>
            <p className="text-md">Job Type: {jobData.jobType}</p>
            <p className="text-md">Location: {jobData.location}</p>
            <p className="text-md my-2">{jobData.description}</p>
          </div>
        ) : (
          <div className="my-8 relative mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Loading...</h2>
            <div className="w-64 h-4 bg-gray-200 rounded-lg mx-auto">
              <div
                className="w-full h-full bg-blue-500 rounded-lg"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        {jobData ? (
          <div>
            <h2 className="text-2xl font-semibold">Apply for {jobData.title}</h2>
            {/* Display your application form here */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Full Name"
                  required
                  onChange={handleTextInputChange}
                  value={formData.fullName}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Email Address"
                  required
                  onChange={handleTextInputChange}
                  value={formData.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Phone Number"
                  required
                  onChange={handleTextInputChange}
                  value={formData.phoneNumber}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cvFile" className="block text-sm font-medium text-gray-700">
                  CV (PDF)
                </label>
                <input
                  type="file"
                  id="cvFile"
                  name="cvFile"
                  accept=".pdf"
                  required
                  onChange={(e) => handleFileInputChange(e, 'cvFile')}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                  Align to the position you are applying for
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Type your cover letter here"
                  rows="5"
                  required
                  onChange={handleTextInputChange}
                  value={formData.coverLetter}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700">
                  Driver License (PDF, JPG, JPEG, or PNG)
                </label>
                <input
                  type="file"
                  id="driverLicense"
                  name="driverLicense"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileInputChange(e, 'driverLicense')}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="ssnCopy" className="block text-sm font-medium text-gray-700">
                  SSN Copy (PDF, JPG, JPEG, or PNG)
                </label>
                <input
                  type="file"
                  id="ssnCopy"
                  name="ssnCopy"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  onChange={(e) => handleFileInputChange(e, 'ssnCopy')}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover.bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit Application
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ApplyJob;
