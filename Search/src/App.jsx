import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from './components/Search.jsx';

const App = () => {
  return (
    <Router>
      <Search />
    </Router>
  );
};

export default App;