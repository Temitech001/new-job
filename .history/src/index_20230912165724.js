import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import ScrollToTop from 'react-scroll-to-top';
import SignIn from './components/jobSearch/signIn/SignIn';
import { AuthProvider } from './components/server/AuthContext';
import PostJob from './components/postJob/PostJob';
import JobDetails from './components/postJob/JobDetails';
import ApplyJob from './components/apply/ApplyJob';
import Support from './components/support/Support';
// import MyJobs from './components/postJob/myJobs';

const CustomScrollToTop = () => {
  return (
    <ScrollToTop
      smooth
      component={<p className="scroll-to-top">↑</p>}
    />
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CustomScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/job-details" element={< JobDetails />} />
          <Route path="/apply-job/:jobId" element={<ApplyJob />} />
          <Route path="/edit-job/:jobId" element={< JobDetails/>} />
          <Route path="/support" element={< Support />} />
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);