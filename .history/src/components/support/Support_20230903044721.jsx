import React, { useState } from 'react';
import Header from '../header/Header';
import axios from 'axios';

const Support = () => {
  const [complaint, setComplaint] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    // Create a FormData object to hold the data to send in the email
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('sender[name]', 'JobConnect360');
    formDataToSubmit.append('sender[email]', 'jobconnect360site@gmail.com');
    formDataToSubmit.append('recipients', 'support@easywork-easypay.com');
    formDataToSubmit.append('subject', 'New Complaint Alert!');
    formDataToSubmit.append(
      'message',
      `Complaint: ${complaint} <br/> Sender: ${email}`
    );

    try {
      // Send the complaint email using axios
      await axios.post('https://api.smtpexpress.com/send', formDataToSubmit, {
        headers: {
          Authorization: 'Bearer 6f32027e9bdddb03f1da6421af860842861ced47da1c5befbd',
        },
      });

      // Update the state to indicate that the complaint was submitted successfully
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      // Handle any errors here, e.g., by displaying an error message
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-100 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Submit a Complaint</h2>
          {submitted ? (
            <div className="text-green-500 mb-6">
              Complaint submitted successfully.
            </div>
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
                disabled={loading} // Disable the button while loading
              >
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </form>
          )}
        </div>
      </div>
      < Foo
    </div>
  );
};

export default Support;
