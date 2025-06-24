// src/pages/UserAccount.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getFirestore,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import '../style.css';
import '../pages.css';

function UserAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setTimeout(() => navigate('/login'), 0);
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const purchaseQuery = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );
    const salesQuery = query(
      collection(db, 'products'),
      where('sellerId', '==', user.uid)
    );

    const unsubscribePurchases = onSnapshot(purchaseQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPurchases(data.reverse()); // newest first
    });

    const unsubscribeSales = onSnapshot(salesQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSales(data.reverse()); // newest first
    });

    return () => {
      unsubscribePurchases();
      unsubscribeSales();
    };
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
                <div className="row">
                  {purchases.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={{
                        id: item.id,
                        title: item.productName || "Product",
                        price: item.productPrice || 0,
                        image: item.productImage || "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
                      }}
                      onDelete={async () => {
                        try {
                          await deleteDoc(doc(db, 'orders', item.id));
                        } catch (error) {
                          console.error("Error deleting purchase:", error);
                        }
                      }}
                    />
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
                <div className="row">
                  {sales.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={{
                        id: item.id,
                        title: item.title || "Product",
                        price: item.price || 0,
                        image: item.image || "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
                      }}
                      onDelete={async () => {
                        try {
                          await deleteDoc(doc(db, 'products', item.id));
                        } catch (error) {
                          console.error("Error deleting sale:", error);
                        }
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p>You haven’t sold anything yet. <a href="/sell">List an item</a></p>
              )}
            </div>

          </div>

          {/* Logout button */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn" onClick={handleLogout}>Log Out</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default UserAccount;