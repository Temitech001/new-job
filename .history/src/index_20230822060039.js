import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import App from './App';
import ScrollToTop from 'react-scroll-to-top';
import SignIn from './components/jobSearch/signIn/SignIn';
import { AuthProvider } from './components/server/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> 
    <BrowserRouter>
    <ScrollToTop/>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/postjob" element={<Po />} />
                {/* <Route path="/contact" element={<ContactPage />} /> */}
            </Routes>
            {/* <App /> */}
        </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);