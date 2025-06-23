// src/pages/Boys.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

function Boys() {
  const products = [
    {
      image: "/images/KidsLinenBlend.webp",
      title: "Kids Linen-Blend Shorts",
      price: "$11.99",
      category: ['Boys']
    },
    {
      image: "/images/KidsRollCuff.webp",
      title: "Roll-Cuff White Pants",
      price: "$14.99",
      category: ['Boys']
    },
    {
      image: "/images/KidsEmbroideredTropical.webp",
      title: "Embroidered Tropical Set",
      price: "$16.99",
      category: ['Boys']
    },
    {
      image: "/images/BoysDinoSwimTrunks.webp",
      title: "Boys Dino Swim Trunks",
      price: "$13.49",
      category: ['Boys']
    },
    {
      image: "/images/BoysDinoRashguard.webp",
      title: "Boys Dino Rashguard",
      price: "$12.79",
      category: ['Boys']
    },
    {
      image: "/images/BoysCanvasSlip.webp",
      title: "Boys Canvas Slip Shoes",
      price: "$17.99",
      category: ['Boys']
    },
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
        <p>Explore trendy and comfortable outfits for boys.</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
      
        <Footer />
    </>
  );
}

export default Boys;

