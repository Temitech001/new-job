import './App.css';
import Footer from './components/footer/Footer';
// import Test from './components/Test.jsx';
import Header from './components/header/Header';
import JobListing from './components/jobSearch/JobListing';

function App() {
  return (
    <div className="App ">
      <Header/>
      {/* <Test/> */}
      <JobListing/>
      <Footer/>
    </div>
  );
}

export default App;
