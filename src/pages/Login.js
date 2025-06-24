// src/pages/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMessage('');

  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/account');
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        setErrorMessage('No account found with that email.');
        break;
      case 'auth/wrong-password':
        setErrorMessage('Incorrect password.');
        break;
      case 'auth/invalid-email':
        setErrorMessage('Invalid email address.');
        break;
      case 'auth/too-many-requests':
        setErrorMessage('Too many failed attempts. Try again later.');
        break;
      default:
        setErrorMessage('Login failed. Please try again.');
    }
    console.error('Firebase login error:', error.code, error.message); 
  }
};

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="auth-page">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
          {errorMessage && <p className="login-error-message">{errorMessage}</p>}
        </form>
        <p className="link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Login;

