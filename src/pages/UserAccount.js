// src/pages/UserAccount.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getFirestore, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ConfirmButton from '../components/ConfirmButton';
import '../style.css';
import '../pages.css';

function UserAccount() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]); 
  const navigate = useNavigate();
  const db = getFirestore();
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [loadingSales, setLoadingSales] = useState(true);

  useEffect(() => {

    //Navigate to Login Page if not already logged in
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

    // For Loading Message: set loading to true before data is fetched
    setLoadingPurchases(true);
    setLoadingSales(true);

    // Get purchases made by current user
    const purchaseQuery = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );

    // Get sales made by current user
    const salesQuery = query(
      collection(db, 'products'),
      where('sellerId', '==', user.uid)
    );

    // Show most recent purchases at top of page
    const unsubscribePurchases = onSnapshot(purchaseQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPurchases(data.reverse());
      setLoadingPurchases(false);//Set loading to false
    });
    
    // Show most recent sales at top of page
    const unsubscribeSales = onSnapshot(salesQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSales(data.reverse());
      setLoadingSales(false);//Set loading to false
    });

    return () => {
      unsubscribePurchases();
      unsubscribeSales();
    };
  }, [user, db]);

  //Logout buttons
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  //Loading message for fetching info from Firebase/Firestore
  if (loading || loadingPurchases || loadingSales) return <p>Loading your account info...</p>;
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
              <h3>Purchase History</h3>
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
              <h3>Sales History</h3>
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
                        deleteScope: 'site', //used to remove selected sale from buy pages and sales history
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
            <ConfirmButton onConfirm={handleLogout} message="Are you sure you want to log out?" className="logout-button">
              Log Out
            </ConfirmButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default UserAccount;