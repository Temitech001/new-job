import React, { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/server/firebase'; // Import your Firebase db object

const Test = () => {
  useEffect(() => {
    const fetchAllDocuments = async () => {
      try {
        const jobListRef = collection(db, 'jobList');
        const querySnapshot = await getDocs(jobListRef);

        querySnapshot.forEach((doc) => {
          console.log('Document data:', doc.data());
        });
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    // Call the function to fetch and log the documents when the component mounts
    fetchAllDocuments();
  }, []);

  return (
    <div>
      <h1>Firestore Document Fetch Test</h1>
      {/* You can render any additional components or content here */}
    </div>
  );
};

export default Test;
