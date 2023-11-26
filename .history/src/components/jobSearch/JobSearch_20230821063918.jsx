import React, { useState } from 'react';
import jobList from './jobList.json'; // Mock job list data
import './JobSearch.css'; // Create a CSS file for custom styles

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
    <div className="flex items-center justify-center mt-16">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <label htmlFor="what" className="absolute left-2 -top-3 text-gray-600">What</label>
          <input
            type="text"
            id="what"
            placeholder="Job title, keyword, or company"
            className="border p-2 rounded w-64 border-black"
            value={what}
            onChange={handleWhatChange}
          />
          {whatSuggestions.length > 0 && (
            <ul className="suggestions">
              {whatSuggestions.map((suggestion) => (
                <li key={suggestion.id}>{suggestion.title}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative">
          <label htmlFor="where" className="absolute left-2 -top-3 text-gray-600">Where</label>
          <input
            type="text"
            id="where"
            placeholder="City or state"
            className="border p-2 rounded w-64 border-black"
            value={where}
            onChange={handleWhereChange}
          />
          {whereSuggestions.length > 0 && (
            <ul className="suggestions">
              {whereSuggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Find Job
        </button>
      </div>
    </div>
  );
};

export default JobSearch;
