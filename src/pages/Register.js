// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/account';

  const handleRegister = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setErrorMessage('');
    setLoading(true); // Start loading

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(returnTo);
    } catch (error) {
      setErrorMessage('Registration failed: ' + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <AuthForm
        title="Register"
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleRegister}
        buttonText="Register"
        errorMessage={errorMessage}
      >
        <p className="link">
          Already have an account? <Link to="/login" state={{ returnTo }}>Login</Link>
        </p>
      </AuthForm>
      {loading && <p style={{ textAlign: 'center' }}>Creating Account...</p>}
      <Footer />
    </div>
  );
}

export default Register;