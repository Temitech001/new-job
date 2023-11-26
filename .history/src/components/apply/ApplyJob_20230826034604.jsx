import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server/firebase';
import Header from '../header/Header';
import { FaBuilding, FaMoneyBillAlt, FaSuitcase, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'; // Import React icons

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null); // State to store job details
  const [isApplying, setIsApplying] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Function to fetch job details based on jobId
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

    // Simulate a loading delay and update loadingProgress
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

  // Function to handle Apply button click
  const handleApplyClick = () => {
    setIsApplying(true);
  };

  // State for Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    cvFile: null,
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const personalInfoForm = (
    <div>
      <h2 className="text-2xl font-semibold">Personal Information</h2>
      <input
        type="text"
        name="fullName"
        value={personalInfo.fullName}
        onChange={handlePersonalInfoChange}
        placeholder="Full Name"
        required
      />
      {/* Add other personal info fields */}
      <input
        type="file"
        name="cvFile"
        onChange={handlePersonalInfoChange}
        accept=".pdf"
        required
      />
      <button onClick={() => setCurrentStage('coverLetter')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Next
      </button>
    </div>
  );

  // State for Cover Letter
  const [coverLetter, setCoverLetter] = useState('');

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
  };

  const coverLetterForm = (
    <div>
      <h2 className="text-2xl font-semibold">Cover Letter</h2>
      <textarea
        name="coverLetter"
        value={coverLetter}
        onChange={handleCoverLetterChange}
        placeholder="Type your cover letter here"
        required
      />
      <button onClick={() => setCurrentStage('verification')} className="bg-blue-500 hover.bg-blue-600 text-white px-4 py-2 rounded">
        Next
      </button>
      <button onClick={() => setCurrentStage('personalInfo')} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
        Previous
      </button>
    </div>
  );

  // State for Verification
  const [verification, setVerification] = useState({
    driverLicense: null,
    ssnCopy: null,
  });

  const handleVerificationChange = (e) => {
    const { name, files } = e.target;
    setVerification({ ...verification, [name]: files[0] });
  };

  const verificationForm = (
    <div>
      <h2 className="text-2xl font-semibold">Verification</h2>
      <input
        type="file"
        name="driverLicense"
        onChange={handleVerificationChange}
        accept=".pdf,.jpg,.jpeg,.png"
        required
      />
      <input
        type="file"
        name="ssnCopy"
        onChange={handleVerificationChange}
        accept=".pdf,.jpg,.jpeg,.png"
        required
      />
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Submit Application
      </button>
      <button onClick={() => setCurrentStage('coverLetter')} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
        Previous
      </button>
    </div>
  );

  // Function to handle Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the logic to submit the job application to Firestore here
    // You can use a function similar to handleSaveClick in your JobDetails component
    // After submission, you can show a success message or redirect the user to a confirmation page
  };

  return (
    <>
        <Header/>

        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 mx-auto mt-4">
      {jobData ? (
        <div>
          <h2 className="text-2xl font-semibold">{jobData.title}</h2>
          {/* Display job details here */}
          <p className="text-md"><FaBuilding className="inline-block mr-2" />{jobData.company}</p>
            <p className="text-md"><FaMoneyBillAlt className="inline-block mr-2" />Salary Range: ${jobData.salaryMin} - ${jobData.salaryMax}</p>
            <p className="text-md"><FaSuitcase className="inline-block mr-2" />Job Type: {jobData.jobType}</p>
            <p className="text-md"><FaMapMarkerAlt className="inline-block mr-2" />Location: {jobData.location}</p>
            <p className="text-md my-2">{jobData.description}</p>
            <div className='flex justify-between'>
            <p className="text-md"><FaEnvelope className="inline-block mr-2" />support@jobconnect360.com</p>
          <button onClick={handleApplyClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Apply
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
          <form onSubmit={handleSubmit}>
            {/* Create your job application form fields here */}
            {/* Example: */}
            {/* <input type="text" name="name" placeholder="Your Name" required /> */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
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
