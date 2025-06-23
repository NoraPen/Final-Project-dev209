// src/pages/Baby.js
import React from 'react';
import '../style.css';
import '../pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; 
import ProductCard from '../components/ProductCard';

function Baby() {
  const products = [
    {
      image: '/images/BabyGirlsEmbroideredSweater.webp',
      title: 'Embroidered Sweater Set',
      price: '$19.99',
      category: ['Baby'],
    },
    {
      image: '/images/BabyGirlsFloralDress.webp',
      title: 'Floral Dress Set',
      price: '$17.99',
      category: ['Baby'],
    },
    {
      image: '/images/BabyStripedSnugFit.webp',
      title: 'Pink Striped Footed Sleeper',
      price: '$12.99',
      category: ['Baby'],
    },
    {
      image: '/images/BabyBoysMarledSweater.webp',
      title: 'Marled Sweater Set',
      price: '$19.99',
      category: ['Baby'],
    },
    {
      image: '/images/BabyBoysAnimalBodysuit3.webp',
      title: 'Animal Bodysuits (3-Pack)',
      price: '$16.49',
      category: ['Baby'],
    },
    {
      image: '/images/BabySweaterRomper.webp',
      title: 'Knit Sweater Romper',
      price: '$21.99',
      category: ['Baby'],
    },
  ];

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
        <p className="page-description">Adorable outfits for your little one!</p>

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

export default Baby;
