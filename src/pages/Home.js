// src/pages/Home.js
import React from 'react';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';



function Home() {
  const products = [
    {
      src: "/images/BabyBoysTShirt.webp",
      title: "Shark Tee & Shorts Set",
      price: "$9.99",
    },
    {
      src: "/images/GerberBaby.webp",
      title: "Neutral Baby Bodysuits",
      price: "$11.99",
    },
    {
      src: "/images/toddlerpants.webp",
      title: "Toddler Stretch Jeans",
      price: "$15.49",
    },
    {
      src: "/images/toddlershorts.webp",
      title: "Red Rashguard & Shorts",
      price: "$14.29",
    },
    {
      src: "/images/boylong.webp",
      title: "Boys Light Blue Dress Shirt",
      price: "$13.99",
    },
    {
      src: "/images/boyblouse.webp",
      title: "Boys Shark Print Shirt",
      price: "$12.99",
    },
    {
      src: "/images/girlblouse.webp",
      title: "Girls Black Halter Top",
      price: "$10.99",
    },
    {
      src: "/images/girldress.webp",
      title: "Girls Pink Summer Dress",
      price: "$16.99",
    },
  ];

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
          {products.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src={product.src} alt={product.title} />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p>{product.price}</p>
                </div>
                <div className="card-footer text-center">
                  <a className="btn" href="#">Add to cart</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer /> 
    </>
  );
}

export default Home;
