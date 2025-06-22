import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Pajamas() {
  const pajamasProducts = [
    {
      title: "Blue Striped Pajamas",
      price: "$19.99",
      image: "/images/KidsStripedSnugFit.webp"
    },
    {
      title: "Navy Striped Pajamas",
      price: "$19.99",
      image: "/images/KidsStriped2.webp"
    },
    {
      title: "Yellow Cotton Pajamas",
      price: "$18.99",
      image: "/images/FitCottonPajamas.webp"
    },
    {
      title: "Gray Gymmies Pajamas",
      price: "$18.99",
      image: "/images/GymmiesGray.webp"
    },
    {
      title: "Aqua Gymmies Pajamas",
      price: "$18.99",
      image: "/images/GymmiesAqua.webp"
    },
    {
      title: "7-Pack Boys Briefs",
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
            <div className="col" key={index}>
              <div className="card h-100">
                <img src={product.image} alt={product.title} />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p>{product.price}</p>
                </div>
                <div className="card-footer text-center">
                  <a className="btn btn-primary" href="#">Add to Cart</a>
                </div>
              </div>
            </div>
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
      <Footer />
    </>
  );
}

export default Pajamas;
