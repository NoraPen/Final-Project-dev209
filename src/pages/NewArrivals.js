// src/pages/NewArrivals.js
import React, { useEffect, useState } from 'react';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("category", "array-contains", "New Arrivals")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <>
      <Navbar />

      {/* Section Menu */}
      <div className="category-links">
        <Link to="/new-arrivals">NEW ARRIVALS</Link> |
        <Link to="/boys">BOYS</Link> |
        <Link to="/girls">GIRLS</Link> |
        <Link to="/baby">BABY</Link> |
        <Link to="/swim">SWIM</Link> |
        <Link to="/pajamas">PAJAMAS</Link>
      </div>

      <main className="container py-5">
        <p>Be the first to shop the latest and greatest in children's clothing!</p>

        {loading ? (
          <p>Loading products...</p> 
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
            {products.length ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
      </main>

      <Footer /> 
    </>
  );
}

export default NewArrivals;