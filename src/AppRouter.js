import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import UserAccount from './pages/UserAccount';
import Pajamas from './pages/Pajamas';
import NewArrivals from './pages/NewArrivals';
import Boys from './pages/Boys';
import Girls from './pages/Girls';
import Baby from './pages/Baby';
import Swim from './pages/Swim';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/pajamas" element={<Pajamas />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/baby" element={<Baby />} />
        <Route path="/swim" element={<Swim />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

