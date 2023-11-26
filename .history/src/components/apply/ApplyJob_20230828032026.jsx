import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server/firebase';
import Header from '../header/Header';
import { FaBuilding, FaMoneyBillAlt, FaSuitcase, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

let localStorageUpdateTimeout;

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: localStorage.getItem('fullName') || '',
    email: localStorage.getItem('email') || '',
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    coverLetter: localStorage.getItem('coverLetter') || '',
    cvFile: null,
    driverLicense: null,
    ssnCopy: null,
  });

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

  const [currentStage, setCurrentStage] = useState('personalInfo');

  const moveToNextStage = () => {
    if (currentStage === 'personalInfo') {
      setCurrentStage('coverLetter');
    } else if (currentStage === 'coverLetter') {
      setCurrentStage('verification');
    }
  };

  const moveToPreviousStage = () => {
    if (currentStage === 'coverLetter') {
      setCurrentStage('personalInfo');
    } else if (currentStage === 'verification') {
      setCurrentStage('coverLetter');
    }
  };

  // Function to handle text input changes and auto-save to localStorage
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    // Update the local state
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Debounce the localStorage update
    clearTimeout(localStorageUpdateTimeout);
    localStorageUpdateTimeout = setTimeout(() => {
      localStorage.setItem(name, value);
    }, 1000); // Adjust the debounce delay as needed
  };

  const personalInfoForm = (
    <div>
      <h2 className="text-2xl font-semibold">Personal Information</h2>
      <form>
        {/* ...other input fields */}
        <div className="mb-4">
          <label htmlFor="cvFile" className="block text-sm font-medium text-gray-700">
            CV (PDF)
          </label>
          <input
            type="file"
            id="cvFile"
            name="cvFile"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'cvFile')}
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
        {/* ...other input fields */}
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
      <form onSubmit={handleFormSubmit}>
        {/* ...other input fields */}
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

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, [fieldName]: file }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('fullName', formData.fullName);
    formData.append('email', formData.email);
    formData.append('phoneNumber', formData.phoneNumber);
    formData.append('coverLetter', formData.coverLetter);
    formData.append('cvFile', formData.cvFile);
    formData.append('driverLicense', formData.driverLicense);
    formData.append('ssnCopy', formData.ssnCopy);

    try {
      // Make a POST request to your server
      const response = await axios.post('/submit-application', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to handle file uploads
        },
      });

      // Handle the response, you can show a success message or redirect the user
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error submitting form:', error);
    }
  };

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
        {/* ...job data */}
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
