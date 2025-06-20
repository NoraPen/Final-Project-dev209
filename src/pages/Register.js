// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/Navbar';


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/account';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(returnTo);
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <><Navbar/>
    <main className="auth-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login" state={{ returnTo }}>Login</Link></p>
      </form>
    </main>
    <footer className="footer-custom">
  <div className="footer-content">
    <p>📍 123 Sunshine St, Seattle, WA</p>
    <p>📞 (123) 456-7890</p>
    <p>📧 contact@minicloset.com</p>
    <p>📸 Instagram: @minicloset_app</p>
  </div>
  <div className="footer-bottom">
    <p>© 2025 Mini Closet. All rights reserved.</p>
  </div>
</footer>
</>
  );
}

export default Register;