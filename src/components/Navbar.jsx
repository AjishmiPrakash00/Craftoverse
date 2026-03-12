import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, Package, HelpCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <h3>Craftoverse</h3>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/catalogue">Catalogue</Link>
        <Link to="/custom">Custom</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Right side icons */}
      <div className="nav-actions">
        <Link to="/cart" className="icon-btn" style={{ position: "relative" }}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              className="cart-badge"
              style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                background: "#f98ca4",
                color: "white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <div className="user-menu-container" ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              className="avatar-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2f9e91' }}
                />
              ) : (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2f9e91', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {user.user_metadata?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </button>

            {dropdownOpen && (
              <div
                className="profile-dropdown"
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  width: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  zIndex: 100,
                  border: '1px solid #eee'
                }}
              >
                <div style={{ padding: '16px', borderBottom: '1px solid #eee', background: '#fdfaf6' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#1f3f3b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.user_metadata?.full_name || 'My Account'}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#777', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.email}
                  </p>
                </div>

                <Link to="/tracking" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#333', fontSize: '0.9rem', transition: 'background 0.2s' }} onClick={() => setDropdownOpen(false)} onMouseOver={e => e.currentTarget.style.background = '#f9f9f9'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <Package size={16} color="#2f9e91" /> Tracking
                </Link>

                <Link to="/orders" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#333', fontSize: '0.9rem', transition: 'background 0.2s' }} onClick={() => setDropdownOpen(false)} onMouseOver={e => e.currentTarget.style.background = '#f9f9f9'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <ShoppingCart size={16} color="#2f9e91" /> Orders
                </Link>

                <Link to="/rating" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#333', fontSize: '0.9rem', transition: 'background 0.2s' }} onClick={() => setDropdownOpen(false)} onMouseOver={e => e.currentTarget.style.background = '#f9f9f9'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>⭐</span> Rating
                </Link>

                <Link to="/faq" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#333', fontSize: '0.9rem', transition: 'background 0.2s' }} onClick={() => setDropdownOpen(false)} onMouseOver={e => e.currentTarget.style.background = '#f9f9f9'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <HelpCircle size={16} color="#2f9e91" /> FAQ
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                    background: 'white',
                    color: '#e74c3c',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    borderTop: '1px solid #eee',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#fff5f5'}
                  onMouseOut={e => e.currentTarget.style.background = 'white'}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-link">
            <User size={18} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
