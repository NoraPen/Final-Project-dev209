import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Buy from './pages/Buy';
import SellForm from './pages/SellForm';
import SellPreview from './pages/SellPreview';
import UserAccount from './pages/UserAccount';
import Pajamas from './pages/Pajamas';
import NewArrivals from './pages/NewArrivals';
import Boys from './pages/Boys';
import Girls from './pages/Girls';
import Baby from './pages/Baby';
import Swim from './pages/Swim';
import Login from './pages/Login';
import Register from './pages/Register';
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<SellForm />} />
        <Route path="/sell-preview" element={<SellPreview />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/pajamas" element={<Pajamas />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/baby" element={<Baby />} />
        <Route path="/swim" element={<Swim />} />
        <Route path="/login" element={<Login />} />       
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

