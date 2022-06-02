import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './Components/MyNavbar';
import AllCountry from './Pages/AllCountry';
import AllAirline from './Pages/AllAirline';
import AllAirport from './Pages/AllAirport';
import AllFlight from './Pages/AllFlight';
import Home from './Pages/Home';

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/country" element={<AllCountry />} />
        <Route exact path="/airline" element={<AllAirline />} />
        <Route exact path="/airport" element={<AllAirport />} />
        <Route exact path="/flight" element={<AllFlight />} />
      </Routes>
    </Router>
  );
};

export default App;
