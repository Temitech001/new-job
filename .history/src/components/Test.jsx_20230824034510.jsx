import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase db object

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

// Call the function to fetch and log the documents
fetchAllDocuments();
