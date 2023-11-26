import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import App from './App';
import ScrollToTop from 'react-scroll-to-top';
import SignIn from './components/jobSearch/signIn/SignIn';
import { AuthProvider } from './components/server/AuthContext';
import PostJob from './components/postJob/PostJob';
import JobDetails from './components/postJob/JobDetails';
import ApplyJob from './components/apply/ApplyJob';
import MyJobs from './components/postJob/myJobs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> 
    <BrowserRouter>
    <ScrollToTop/>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/job-details" element={< JobDetails />} />
                <Route path="/apply-job/:jobId" element={<ApplyJob />} />
                {/* <Route path="/myjobs" element={<MyJobs />} /> */}
                <Route path="/support" element={< />} />
            </Routes>
            {/* <App /> */}
        </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);