import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AllCountry from './Pages/AllCountry';
import AllAirline from './Pages/AllAirline';
import Home from './Pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/country" element={<AllCountry />} />
        <Route exact path="/airline" element={<AllAirline />} />
      </Routes>
    </Router>
  );
};

export default App;
