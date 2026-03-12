import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4 className="footer-brand">Craftoverse</h4>
          <p>Stickers and posters for every vibe. Custom designs and bulk orders available.</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/catalogue">Catalogue</Link></p>
          <p><Link to="/custom">Custom Orders</Link></p>
          <p><Link to="/contact">Contact Us</Link></p>
        </div>

        <div className="footer-column">
          <h4>Policies</h4>
          <p><Link to="/shipping">Shipping Policy</Link></p>
          <p><Link to="/return">Return Policy</Link></p>
          <p><Link to="/privacy">Privacy Policy</Link></p>
          <p><Link to="/terms">Terms &amp; Conditions</Link></p>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>✉️ craftoverseofficial@gmail.com</p>
          <p>📞 +91 81389 01292</p>
          <p>📍 Angamaly, Kerala, India</p>
        </div>
      </div>
      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%' }}>
        <p style={{ margin: 0 }}>© 2026 Craftoverse. All rights reserved.</p>
        <Link to="/admin-login" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem', opacity: 0.7 }}>
          Admin Access
        </Link>
      </div>
    </footer>
  );
}
