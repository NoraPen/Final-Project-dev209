import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">MiniCloset</span>
      </div>

      <div className="navbar-center">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/buy">Buy</Link>
        <Link className="nav-link" to="/sell">Sell</Link>
        <Link className="nav-link" to="/account">My Account</Link>
      </div>

      <div className="navbar-right">
        <button className="cart-button">Cart 🛒</button>
      </div>
    </div>
  );
}

export default Navbar;
