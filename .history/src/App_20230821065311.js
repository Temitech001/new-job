import './App.css';
import Header from './components/header/Header';
import JobSearch from './components/jobSearch/Job';
import JobListing from './components/jobSearch/JobListing';

function App() {
  return (
    <div className="App">
      <Header/>
      <JobListing/>

    </div>
  );
}

export default App;
