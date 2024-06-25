import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Admin from './components/Admin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  );
};

export default App;
