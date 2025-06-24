// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';

function Home() {
  const [products, setProducts] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("category", "array-contains", "Home")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <>
      <Navbar />

      {/* Hero Image Section */}
      <section className="hero-image">
        <img src="/images/groupkids.webp" alt="Kids Walking" />
      </section>

      {/* Info Banner */}
      <section className="info-banner">
        <div className="container info-content">
          <div className="info-text">
            <h2>Good Night</h2>
            <p>30% off select pajamas for a limited time</p>
            <Link to="/pajamas" className="btn">Shop Now</Link>
          </div>
          <div className="info-image">
            <img src="/images/welcomeslide.png" alt="Promo" />
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      <div className="container">
        <h3 className="section-title-inline">We Think You Will Love These</h3>
        <div className="row">
          {products.length ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>

      <Footer /> 
    </>
  );
}

export default Home;

