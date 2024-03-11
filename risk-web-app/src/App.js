// System Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// UI Components
import Navbar from "./components/NavBar";
import Footer from "./components/footer";
// Pages
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import TestPlot from './pages/TestPlot'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/survey" element={<SurveyPage />} />
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
