import React, { useState, useEffect } from 'react';
import { db } from '../server/firebase';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedJob, setEditedJob] = useState({});

  // Fetch jobs from Firestore and update the state
  useEffect(() => {
    const fetchData = async () => {
      const jobsCollection = db.collection('jobs');
      const snapshot = await jobsCollection.get();
      const jobList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
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
      await db.collection('jobs').doc(editedJob.id).update(editedJob);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving edited job: ', error);
    }
  };

  // Handle deleting a job
  const handleDelete = async (jobId) => {
    try {
      await db.collection('jobs').doc(jobId).delete();
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
    </div>
  );
};

export default JobList;
