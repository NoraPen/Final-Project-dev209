// src/pages/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fromSell = location.state?.fromSell;
  const hasAlerted = useRef(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true); //Set loading to true

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
    } finally {
      setLoading(false); // Stop loading
    }
  };

    //Alert when 'Sell' on Navbar is selected by a user who is not logged in  
    useEffect(() => {
    if (fromSell && !hasAlerted.current) {
      alert('You must be logged in to sell an item.');
      hasAlerted.current = true; // Prevent Alert from Showing multiple times
    }
  }, [fromSell]);
  return (
    <div className="page-wrapper">
      <Navbar />
      
      <AuthForm
        title="Login"
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        buttonText="Log In"
        errorMessage={errorMessage}
      >
        
        <p className="link">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </AuthForm>
      {loading && <p style={{ textAlign: 'center' }}>Logging in...</p>}
      <Footer />
    </div>
  );
}

export default Login;

