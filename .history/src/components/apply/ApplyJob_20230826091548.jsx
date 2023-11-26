import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server/firebase';
import Header from '../header/Header';
import { FaBuilding, FaMoneyBillAlt, FaSuitcase, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

  const handleApplyClick = () => {
    setIsApplying(!isApplying);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the logic to submit the job application to Firestore here
  };

  const [currentStage, setCurrentStage] = useState('personalInfo');

  const moveToNextStage = () => {
    // Implement logic to move to the next stage here
    if (currentStage === 'personalInfo') {
      setCurrentStage('coverLetter');
    } else if (currentStage === 'coverLetter') {
      setCurrentStage('verification');
    }
  };

  const moveToPreviousStage = () => {
    // Implement logic to move to the previous stage here
    if (currentStage === 'coverLetter') {
      setCurrentStage('personalInfo');
    } else if (currentStage === 'verification') {
      setCurrentStage('coverLetter');
    }
  };

  const personalInfoForm = (
    <div>
      <h2 className="text-2xl font-semibold">Personal Information</h2>
      <form>
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
          />
        </div>
        <button
          type="button"
          onClick={moveToNextStage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </form>
    </div>
  );

  const coverLetterForm = (
    <div>
      <h2 className="text-2xl font-semibold">Cover Letter</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
            Align to the postion you are applying for
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            className="mt-1 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="Type your cover letter here"
            rows="5"
            required
          />
        </div>
        <button
          type="button"
          onClick={moveToPreviousStage}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={moveToNextStage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </form>
    </div>
  );

  const verificationForm = (
    <div>
      <h2 className="text-2xl font-semibold">Verification</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700">
            Driver License (PDF, JPG, JPEG, or PNG)
          </label>
          <input
            type="file"
            id="driverLicense"
            name="driverLicense"
            accept=".pdf,.jpg,.jpeg,.png"
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
          />
        </div>
        <button
          type="button"
          onClick={moveToPreviousStage}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover.bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );

  let currentForm;
  switch (currentStage) {
    case 'personalInfo':
      currentForm = personalInfoForm;
      break;
    case 'coverLetter':
      currentForm = coverLetterForm;
      break;
    case 'verification':
      currentForm = verificationForm;
      break;
    default:
      currentForm = personalInfoForm;
  }

  return (
    <>
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 mx-auto mt-4">
        {jobData ? (
          <div>
            <h2 className="text-2xl font-semibold">{jobData.title}</h2>
            <p className="text-md"><FaBuilding className="inline-block mr-2" />{jobData.company}</p>
            <p className="text-md"><FaMoneyBillAlt className="inline-block mr-2" />Salary Range: ${jobData.salaryMin} - ${jobData.salaryMax}</p>
            <p className="text-md"><FaSuitcase className="inline-block mr-2" />Job Type: {jobData.jobType}</p>
            <p className="text-md"><FaMapMarkerAlt className="inline-block mr-2" />Location: {jobData.location}</p>
            <p className="text-md my-2">{jobData.description}</p>
            <div className='flex justify-between'>
              <p className="text-md"><FaEnvelope className="inline-block mr-2" />support@jobconnect360.com</p>
              <button
                onClick={handleApplyClick}
                className={`bg-${isApplying ? 'red-500' : 'blue-500'} hover:bg-${isApplying ? 'red-600' : 'blue-600'} text-white px-1.5 py-2 rounded text-sm`}
              >
                {isApplying ? 'Cancel Application' : 'Apply'}
              </button>
            </div>
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
        {isApplying ? (
          <div>
            <h2 className="text-2xl font-semibold">Apply for {jobData.title}</h2>
            {currentForm}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ApplyJob;
