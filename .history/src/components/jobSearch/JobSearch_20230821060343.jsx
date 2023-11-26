import React, { useState } from 'react';
import jobList from './jobList.json'; // Mock job list data

const JobSearch = () => {
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [whatSuggestions, setWhatSuggestions] = useState([]);
  const [whereSuggestions, setWhereSuggestions] = useState([]);

  const handleWhatChange = (e) => {
    const value = e.target.value;
    setWhat(value);
    // Simulated suggestion logic: Filter job titles, keywords, or companies that match the input value
    const suggestions = jobList.filter((job) =>
      job.title.toLowerCase().includes(value.toLowerCase())
    );
    setWhatSuggestions(suggestions);
  };

  const handleWhereChange = (e) => {
    const value = e.target.value;
    setWhere(value);
    // Simulated suggestion logic: Filter cities or states that match the input value
    // You can replace this with actual location data
    const suggestions = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'].filter(
      (location) => location.toLowerCase().includes(value.toLowerCase())
    );
    setWhereSuggestions(suggestions);
  };

  const handleSearch = () => {
    // Perform a search based on the selected "what" and "where" values
    console.log('Searching for:', what, 'in', where);
  };

  return (
    <div className="flex items-center space-x-4 m-auto">
      <input
        type="text"
        placeholder="Job title, keyword, or company"
        className="border p-2 rounded"
        value={what}
        onChange={handleWhatChange}
      />
      <input
        type="text"
        placeholder="City or state"
        className="border p-2 rounded"
        value={where}
        onChange={handleWhereChange}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Find Job
      </button>

      {/* Suggestions */}
      <div className="absolute z-10 mt-2">
        {whatSuggestions.length > 0 && (
          <ul className="bg-white border p-2 rounded">
            {whatSuggestions.map((suggestion) => (
              <li key={suggestion.id}>{suggestion.title}</li>
            ))}
          </ul>
        )}
        {whereSuggestions.length > 0 && (
          <ul className="bg-white border p-2 rounded">
            {whereSuggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
