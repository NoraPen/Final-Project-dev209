import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

function Pajamas() {
  const pajamasProducts = [
    {
      name: "Blue Striped Pajamas",
      price: "$19.99",
      image: "/images/KidsStripedSnugFit.webp"
    },
    {
      name: "Navy Striped Pajamas",
      price: "$19.99",
      image: "/images/KidsStriped2.webp"
    },
    {
      name: "Yellow Cotton Pajamas",
      price: "$18.99",
      image: "/images/FitCottonPajamas.webp"
    },
    {
      name: "Gray Gymmies Pajamas",
      price: "$18.99",
      image: "/images/GymmiesGray.webp"
    },
    {
      name: "Aqua Gymmies Pajamas",
      price: "$18.99",
      image: "/images/GymmiesAqua.webp"
    },
    {
      name: "7-Pack Boys Briefs",
      price: "$14.99",
      image: "/images/BoysBriefs7Pack.webp"
    }
  ];

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
        <p>Cozy and cute pajamas for sweet dreams and comfy nights.</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
          {pajamasProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
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

export default Pajamas;
