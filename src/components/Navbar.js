//src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import ConfirmButton from "../components/ConfirmButton";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };
  // Show "Log Out" button if user is on /account page and logged in
  const isOnAccountPage = location.pathname === '/account';

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">
          <Link to="/">MiniCloset</Link>
        </span>
      </div>

      {/* Hamburger for mobile */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Regular navbar links */}
      <div className={`navbar-center ${menuOpen ? 'open' : ''}`}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/new-arrivals">Buy</Link>
        <Link className="nav-link" to="/sell">Sell</Link>
      </div>

      <div className="navbar-right">
        {user && isOnAccountPage ? (
          <ConfirmButton className="login-button" onConfirm={handleLogout} message="Are you sure you want to log out?">
            Log Out
          </ConfirmButton>
        ) : (
          <button className="login-button" onClick={handleAuthClick}>
            {user ? 'My Account' : 'Log In'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;