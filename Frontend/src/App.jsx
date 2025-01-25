import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Frontend from "./components/Frontend";
import Login from "./components/Login";
import Sign from "./components/Sign";
import About from "./components/About"; 
import Contact from "./components/Contact"; 
import Profile from "./components/Profile"; 
import Leaderboard from "./components/Leaderboard"; 
import Features from "./components/Features";
import Reach from "./components/Reach";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/frontend" element={<Frontend />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/leaderboard" element={<Leaderboard />} /> 
        <Route path="/features" element={<Features />} /> 
        <Route path="/reach" element={<Reach />} /> 
      </Routes>
    </Router>
  );
};

export default App;
