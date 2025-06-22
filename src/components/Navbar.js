import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand"><Link to="/">MiniCloset</Link></span>
      </div>

      <div className="navbar-center">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/new-arrivals">Buy</Link>
        <Link className="nav-link" to="/sell">Sell</Link>
      </div>

      <div className="navbar-right">
        <button className="login-button" onClick={handleAuthClick}>
          {user ? 'My Account' : 'Log In'}
        </button>
       
      </div>
    </div>
  );
}

export default Navbar;