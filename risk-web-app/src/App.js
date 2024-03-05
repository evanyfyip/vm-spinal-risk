// System Imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


// UI Components
import Navbar from "./components/NavBar";
import Footer from "./components/footer";
// Pages
import HomePage from './pages/HomePage';
import SurveyPatientPage from './pages/SurveyPatientPage';
import SurveySurgeonPage from './pages/SurveySurgeonPage';
import SurveyResultsPage from './pages/SurveyResultsPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import TestPlot from './pages/TestPlot'
import { FaFlask, FaReact } from 'react-icons/fa';

function App() {


  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/survey/patient" element={<SurveyPatientPage />} />
          <Route path="/survey/surgeon" element={<SurveySurgeonPage />} />
          <Route path="/survey/results" element={<SurveyResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/TestPlot" element={<TestPlot />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer></Footer>

      </div>
    </Router>
  );
}

export default App;
