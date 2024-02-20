// System Imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

// UI Components
import Navbar from "./components/NavBar";

// Pages
import HomePage from './pages/HomePage';
import SurveyPatientPage from './pages/SurveyPatientPage';
import SurveySurgeonPage from './pages/SurveySurgeonPage';
import SurveyResultsPage from './pages/SurveyResultsPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/home').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <p>The current time is {currentTime}.</p>
    //   </header>
    // </div>
    <Router>
    <Navbar />
    <Routes>
      <Route exact path="/home" element={<HomePage />} />
      <Route path="/survey/patient" element={<SurveyPatientPage />} />
      <Route path="/survey/surgeon" element={<SurveySurgeonPage />} />
      <Route path="/survey/results" element={<SurveyResultsPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  </Router>
  );
}

export default App;
