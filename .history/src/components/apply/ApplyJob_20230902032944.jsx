import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, folder1Ref, folder2Ref, folder3Ref } from '../server/firebase';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '../header/Header';

let localStorageUpdateTimeout;

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: localStorage.getItem('fullName') || '',
    email: localStorage.getItem('email') || '',
    phoneNumber: localStorage.getItem('phoneNumber') || '',
    coverLetter: localStorage.getItem('coverLetter') || '',
    cvFile: null,
    driverLicense: null,
    ssnCopy: null,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Function to upload a file to a specific folder
    const uploadFileToFolder = async (file, folderRef) => {
      try {
        const fileRef = ref(folderRef, file.name);
        await uploadBytes(fileRef, file);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    };

    // Upload CV to folder1
    await uploadFileToFolder(formData.cvFile, folder1Ref);

    // Upload driver license to folder2
    await uploadFileToFolder(formData.driverLicense, folder2Ref);

    // Upload SSN copy to folder3
    await uploadFileToFolder(formData.ssnCopy, folder3Ref);

    const fetchFiles = async () => {
      try {
        const cvFileRef = ref(folder1Ref, formData.cvFile.name);
        const driverLicenseRef = ref(folder2Ref, formData.driverLicense.name);
        const ssnCopyRef = ref(folder3Ref, formData.ssnCopy.name);

        const [cvFileUrl, driverLicenseUrl, ssnCopyUrl] = await Promise.all([
          getDownloadURL(cvFileRef),
          getDownloadURL(driverLicenseRef),
          getDownloadURL(ssnCopyRef),
        ]);

        return { cvFileUrl, driverLicenseUrl, ssnCopyUrl };
      } catch (error) {
        console.error('Error fetching files:', error);
        return {};
      }
    };

    const { cvFileUrl, driverLicenseUrl, ssnCopyUrl } = await fetchFiles();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('sender[name]', 'JobConnect360');
    formDataToSubmit.append('sender[email]', 'jobconnect360site@gmail.com');
    formDataToSubmit.append('recipients', 'akinolapo@gmail.com');
    formDataToSubmit.append('subject', 'New Application Alert!');
    formDataToSubmit.append(
      'message',
      `Find attached the cover letter and resume for this candidate: <br/> Full Name: ${formData.fullName} <br/> Email: ${formData.email} <br/> Phone Number: ${formData.phoneNumber} <br/> Cover Letter: ${formData.coverLetter} <br/> <a href='${cvFileUrl}'>Click to See CV</a> <br/> <a href='${driverLicenseUrl}'>Click to See Driver License</a> <br/> <a href='${ssnCopyUrl}'>Click to See SSN</a> `
    );

    try {
      await axios.post('https://api.smtpexpress.com/send', formDataToSubmit, {
        headers: {
          Authorization: 'Bearer 6f32027e9bdddb03f1da6421af860842861ced47da1c5befbd',
        },
      });

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
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
    <div>
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
        {jobData && !submitSuccess ? (
          <div>
            <h2 className="text-2xl font-semibold">Apply for {jobData.title}</h2>
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
                <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700">
                  Driver License or State ID Front and Back Copy (Supported File: PDF, JPG, JPEG, or PNG)
                </label>
                <div className='block md:flex'>
                <input
                  type="file"
                  id="driverLicense"
                  name="driverLicense"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  onChange={(e) => handleFileInputChange(e, 'driverLicense')}
                />
                <input
                  type="file"
                  id="driverLicenseB"
                  name="driverLicenseB"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  onChange={(e) => handleFileInputChange(e, 'driverLicenseB')}
                  className='mt-2 md:mt-0'
                />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="ssnCopy" className="block text-sm font-medium text-gray-700">
                  SSN Copy (PDF, JPG, JPEG, or PNG)
                </label>
                <div className='block md:flex'>
                <input
                  type="file"
                  id="ssnCopy"
                  name="ssnCopy"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  onChange={(e) => handleFileInputChange(e, 'ssnCopy')}
                />
                <input
                  type="file"
                  id="ssnCopy"
                  name="ssnCopy"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  onChange={(e) => handleFileInputChange(e, 'ssnCopyB')}
                />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                  Cover Letter
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        ) : null}
        {submitSuccess ? (
          <div className="mt-4 text-center">
            <p className="text-green-600 text-xl">Application submitted successfully!</p>
            <Link to="/" className="text-blue-500 mt-2 block hover:underline">
              Return to Homepage
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ApplyJob;
