import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDODT5-vOTYs6McEqDh8sTtZjehb9KlnOw',
  authDomain: 'jobconnect360bypeace.firebaseapp.com',
  databaseURL: 'https://jobconnect360bypeace-default-rtdb.firebaseio.com',
  projectId: 'jobconnect360bypeace',
  storageBucket: 'jobconnect360bypeace.appspot.com',
  messagingSenderId: '592158316184',
  appId: '1:592158316184:web:822269c7bf0b1b33ad22ed',
  measurementId: 'G-7X5Z1RQ0DN'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [newJob, setNewJob] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobCollection = collection(db, 'jobs');
        const snapshot = await getDocs(jobCollection);
        const jobList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [db]);

  // Rest of your component code for editing, saving, creating, and deleting jobs...

  return (
    // Your component JSX...
  );
};

export default JobList;
