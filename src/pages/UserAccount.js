import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import '../style.css';
import '../pages.css';


function UserAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signupDate, setSignupDate] = useState('');
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setTimeout(() => navigate('/login'), 0);
      } else {
        setUser(currentUser);
        if (currentUser.metadata?.creationTime) {
          setSignupDate(new Date(currentUser.metadata.creationTime).toLocaleDateString());
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch purchases and sales from Firestore
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const purchaseQuery = query(collection(db, 'purchases'), where('userId', '==', user.uid));
      const salesQuery = query(collection(db, 'products'), where('sellerId', '==', user.uid));

      const [purchaseSnap, salesSnap] = await Promise.all([
        getDocs(purchaseQuery),
        getDocs(salesQuery),
      ]);

      setPurchases(purchaseSnap.docs.map(doc => doc.data()));
      setSales(salesSnap.docs.map(doc => doc.data()));
    };

    fetchData();
  }, [user, db]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="account-page">
        <header className="page-header">
          <div className="container-MyAccount">
            <h2>My Account</h2>
            <p className="page-description">
              Manage your account details, orders, and preferences.
            </p>
            <h3>Account Details</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member Since:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
 
          </div>
        </header>

        <section className="container-account-section">
  <div className="account-row">
    {/* Purchases Section */}
    <div className="account-card">
      <h3>Purchases</h3>
      {purchases.length > 0 ? (
        <div className="card-grid">
          {purchases.map((item, i) => (
            <div className="card h-100" key={i}>
              <img
                src={item.image || "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"}
                alt={item.title || "Product"}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{item.title || "Product"}</h5>
                <p>${item.price?.toFixed(2) || "0.00"}</p>
              </div>
              <div className="card-footer text-center">
                <a className="btn btn-primary" href="/new-arrivals">View More</a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven’t bought anything yet. <a href="/new-arrivals">Start shopping</a></p>
      )}
    </div>

    {/* Sales Section */}
    <div className="account-card">
      <h3>Sales</h3>
      {sales.length > 0 ? (
        <div className="card-grid">
          {sales.map((item, i) => (
            <div className="card h-100" key={i}>
              <img
                src={item.image || "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"}
                alt={item.title || "Product"}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{item.title || "Product"}</h5>
                <p>${item.price?.toFixed(2) || "0.00"}</p>
              </div>
              <div className="card-footer text-center">
                <a className="btn btn-primary" href="/sell">Edit Listing</a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven’t sold anything yet. <a href="/sell">List an item</a></p>
      )}
    </div>
  </div>

  {/* Logout button (optional: move elsewhere if needed) */}
  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
    <button className="btn" onClick={handleLogout}>Log Out</button>
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