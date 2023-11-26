import './App.css';
// import Test from './components/Test.jsx';
import Header from './components/header/Header';
import JobListing from './components/jobSearch/JobListing';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Test/> */}
      <JobListing/>
    </div>
  );
}

export default App;
