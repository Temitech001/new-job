import React, { useState } from 'react';
import Header from '../header/Header';
import axios from 'axios';

const Support = () => {
  const [complaint, setComplaint] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can implement the logic to submit the complaint here.
    // For this example, we'll just set 'submitted' to true.
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('sender[name]', 'JobConnect360');
    formDataToSubmit.append('sender[email]', 'jobconnect360site@gmail.com');
    formDataToSubmit.append('recipients', 'akinolapo@gmail.com');
    formDataToSubmit.append('subject', 'New Complaint Alert!');
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
    setSubmitted(true);
  };

  return (
    <div>
        <Header/>
    <div className="bg-gray-100 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Submit a Complaint</h2>
        {submitted ? (
          <div className="text-green-500 mb-6">Complaint submitted successfully.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="complaint" className="text-gray-600">
                Describe your complaint
              </label>
              <textarea
                id="complaint"
                rows="4"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Enter your complaint"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-600">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-600"
            >
              Submit Complaint
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default Support;
