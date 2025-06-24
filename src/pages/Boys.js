// src/pages/Boys.js
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function Boys() {
  const [products, setProducts] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("category", "array-contains", "Boys")
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

      {/* Section Menu START */}
      <div className="category-links">
        <Link to="/new-arrivals">NEW ARRIVALS</Link> |
        <Link to="/boys">BOYS</Link> |
        <Link to="/girls">GIRLS</Link> |
        <Link to="/baby">BABY</Link> |
        <Link to="/swim">SWIM</Link> |
        <Link to="/pajamas">PAJAMAS</Link>
      </div>
      {/* Section Menu END */}

      <main className="container py-5">
        <p>Explore trendy and comfortable outfits for boys.</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Boys;
