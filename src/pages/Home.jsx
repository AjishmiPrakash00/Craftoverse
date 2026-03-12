import { Link } from "react-router-dom";
import { useEffect } from "react";
import stickersIcon from "../assets/stickers.svg";
import postersIcon from "../assets/posters.svg";
import customIcon from "../assets/custom.svg";
import sparkleIcon from "../assets/sparkle.svg";  // small decorative icon shown in hero section
import product1 from "../assets/home-car.jpeg";
import product2 from "../assets/home-anime.jpeg";
import product3 from "../assets/home-van-gogh.jpeg";
import product4 from "../assets/home-stranger-things.jpeg";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section id="home" className="section hero">
        <div className="hero-icon-wrapper">
          <img src={sparkleIcon} alt="Sparkle decoration" />
        </div>
        <h1>Welcome to Craftoverse</h1>
        <p>Stickers and posters for every vibe.</p>
        <p>
          Explore stickers and posters across all styles. Custom designs and
          bulk orders available.
        </p>

        <Link to="/catalogue" className="cta-btn">
          Explore the Craftoverse →
        </Link>
      </section>

      {/* Categories */}
      <section id="categories" className="section">
        <h2>Shop by Category</h2>

        <div className="grid-3">
          <Link to="/catalogue?type=stickers" className="category-card">
            <div className="icon-badge">
              <img src={stickersIcon} alt="Stickers" />
            </div>
            <h3>Stickers</h3>
            <p>Waterproof vinyl stickers in all styles</p>
          </Link>

          <Link to="/catalogue?type=posters" className="category-card">
            <div className="icon-badge pink">
              <img src={postersIcon} alt="Posters" />
            </div>
            <h3>Posters</h3>
            <p>Premium quality art prints</p>
          </Link>

          <Link to="/custom" className="category-card">
            <div className="icon-badge yellow">
              <img src={customIcon} alt="Custom Orders" />
            </div>
            <h3>Custom Orders</h3>
            <p>Create your own unique designs</p>
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section id="bestsellers" className="section soft-bg">
        <div className="section-header">
          <h2>Bestsellers</h2>
          <Link to="/catalogue?sort=bestsellers" className="view-all-link">View All</Link>
        </div>
        <div className="grid-4">
          <div className="product-card">
            <div className="product-image">
              <img src={product1} alt="Cute Cat Collection" />
              <span className="badge">Bestseller</span>
            </div>
            <h3>Supercars Collection</h3>
            <p className="category">Stickers</p>
            <p className="price">₹199</p>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src={product2} alt="Anime Stickers" />
              <span className="badge">Bestseller</span>
            </div>
            <h3>Anime Stickers</h3>
            <p className="category">Stickers</p>
            <p className="price">₹49</p>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src={product3} alt="Pastel Dreams" />
              <span className="badge">Bestseller</span>
            </div>
            <h3>Van Gogh Collection</h3>
            <p className="category">Stickers</p>
            <p className="price">₹199</p>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src={product4} alt="Stranger Things Stickers" />
              <span className="badge">Bestseller</span>
            </div>
            <h3>Stranger Things Stickers</h3>
            <p className="category">Posters</p>
            <p className="price">₹49</p>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals" className="section">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <Link to="/catalogue?sort=new" className="view-all-link">View All</Link>
        </div>
        <div className="grid-4">
          <div className="product-card">
            <div className="product-image">
              <img src={product1} alt="Supercars Collection" />
              <span className="badge">New</span>
            </div>
            <h3>Aesthetic Florals</h3>
            <p className="category">Stickers</p>
            <p className="price">₹99</p>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src={product2} alt="Dark Mode Vibes" />
              <span className="badge">New</span>
            </div>
            <h3>Anime Characters</h3>
            <p className="category">Stickers</p>
            <p className="price">₹149</p>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src={product3} alt="Pastel Dreams" />
              <span className="badge">New</span>
            </div>
            <h3>Aesthetic Sunset</h3>
            <p className="category">Stickers</p>
            <p className="price">₹119</p>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src={product4} alt="Minimalist Mountains" />
              <span className="badge">New</span>
            </div>
            <h3>Abstract Shapes</h3>
            <p className="category">Posters</p>
            <p className="price">₹349</p>
          </div>
        </div>
      </section>


    </div>
  );
}
