// PostJob.js

// ... (previous imports and code)

const PostJob = () => {
    const [jobData, setJobData] = useState({
      title: '',
      description: '',
      company: '',
      datePosted: '',
      salaryRangeMin: '', // Minimum salary
      salaryRangeMax: '', // Maximum salary
      jobType: 'Part Time', // Default to Part Time
      location: 'Remote',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setJobData({
        ...jobData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add code to save jobData (with generated ID) to your backend or data store
      // Reset the form after submission
      setJobData({
        title: '',
        description: '',
        company: '',
        datePosted: '',
        salaryRangeMin: '',
        salaryRangeMax: '',
        jobType: 'Part Time',
        location: 'Remote',
      });
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
          <form onSubmit={handleSubmit}>
            {/* ... (previous input fields) */}
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Job Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value="Part Time"
                    checked={jobData.jobType === 'Part Time'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Part Time
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value="Full Time"
                    checked={jobData.jobType === 'Full Time'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Full Time
                </label>
              </div>
            </div>
  
            <div className="mb-4">
              <label htmlFor="salaryRange" className="block text-gray-700 font-medium mb-2">
                Salary Range: {jobData.salaryRangeMin} - {jobData.salaryRangeMax}
              </label>
              <input
                type="range"
                id="salaryRange"
                name="salaryRangeMin"
                min="0"
                max="100000" // Adjust the maximum range value as needed
                step="1000" // Adjust the step value as needed
                value={jobData.salaryRangeMin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <input
                type="range"
                id="salaryRange"
                name="salaryRangeMax"
                min="0"
                max="100000" // Adjust the maximum range value as needed
                step="1000" // Adjust the step value as needed
                value={jobData.salaryRangeMax}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none mt-2"
              />
            </div>
  
            {/* ... (previous input fields) */}
  
            {/* ... (submit button) */}
          </form>
        </div>
      </div>
    );
  };
  
  export default PostJob;
  