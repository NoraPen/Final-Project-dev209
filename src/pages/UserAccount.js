import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import '../style.css';

function UserAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle authentication state and redirect if not logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Delay navigation slightly to prevent React render conflict
        setTimeout(() => {
          navigate('/login');
        }, 0);
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return null; // While redirecting, prevent component render

  return (
    <>
      <Navbar />
      <main className="account-page">
        <header className="page-header">
          <div className="container">
            <h2>My Account</h2>
            <p className="page-description">
              Manage your account details, orders, and preferences.
            </p>
          </div>
        </header>

        <section className="container account-section">
          <div className="account-card">
            <h3>Account Details</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="btn" onClick={handleLogout}>Log Out</button>
          </div>

          <div className="account-card">
            <h3>Order History</h3>
            <p>No recent orders.</p>
          </div>
        </section>
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

export default UserAccount;