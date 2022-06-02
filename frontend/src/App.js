import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './Components/MyNavbar';
import AllCountry from './Pages/AllCountry';
import AllAirline from './Pages/AllAirline';
import AllAirport from './Pages/AllAirport';
import Home from './Pages/Home';
import AirportDetail from './Pages/AirportDetail';

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/country" element={<AllCountry />} />
        <Route exact path="/airline" element={<AllAirline />} />
        <Route exact path="/airport" element={<AllAirport />} />
        <Route exact path="/airport/:id" element={<AirportDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
