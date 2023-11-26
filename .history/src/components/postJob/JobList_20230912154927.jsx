import React, { useState, useEffect } from 'react';
import { db } from '../server/firebase'; // Import your Firebase configuration

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [newJob, setNewJob] = useState({});

  // Fetch jobs from Firestore and update the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobCollection = db.collection('jobList'); // Change to your collection name
        const snapshot = await jobCollection.get();
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
  }, []);

  // Handle editing a job
  const handleEdit = (jobId) => {
    setEditingId(jobId);
    // Find the job to edit in the current jobs list
    const jobToEdit = jobs.find((job) => job.id === jobId);
    setEditedJob(jobToEdit);
  };

  // Handle saving edited job
  const handleSave = async () => {
    try {
      await db.collection('jobList').doc(editedJob.id).update(editedJob); // Change to your collection name
      setEditingId(null);
    } catch (error) {
      console.error('Error saving edited job: ', error);
    }
  };

  // Handle creating a new job document
  const handleCreate = async () => {
    try {
      const newDocRef = await db.collection('jobList').add(newJob); // Change to your collection name
      const newDocSnapshot = await newDocRef.get();
      const newDocData = newDocSnapshot.data();
      setJobs([...jobs, { id: newDocRef.id, ...newDocData }]);
      setNewJob({});
    } catch (error) {
      console.error('Error creating a new job: ', error);
    }
  };

  // Handle deleting a job
  const handleDelete = async (jobId) => {
    try {
      await db.collection('jobList').doc(jobId).delete(); // Change to your collection name
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job: ', error);
    }
  };

  return (
    <div>
      <h1>Job List</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {editingId === job.id ? (
              <>
                <input
                  type="text"
                  value={editedJob.title}
                  onChange={(e) => setEditedJob({ ...editedJob, title: e.target.value })}
                />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <h2>{job.title}</h2>
                <p>{job.description}</p>
                <button onClick={() => handleEdit(job.id)}>Edit</button>
                <button onClick={() => handleDelete(job.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Create a New Job</h2>
      <input
        type="text"
        placeholder="Title"
        value={newJob.title || ''}
        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newJob.description || ''}
        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default JobList;
