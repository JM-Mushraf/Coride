import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register.jsx';

const App = () => {
  return (
    <Router>
      <Register />
    </Router>
  );
};

export default App;
