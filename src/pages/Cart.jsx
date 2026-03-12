import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50; // Fixed delivery fee for now
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="login-page">
        <div className="login-card empty-cart-card">
          <div className="empty-cart-icon-container">
            {/* Fallback to shopping bag logic if empty */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5c7b77" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-cart-icon"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
          <h3 className="empty-cart-title">Your cart is empty</h3>
          <p className="empty-cart-subtitle">Looks like you haven't added anything to your cart yet</p>
          <Link to="/catalogue" className="start-shopping-btn">
            Start Shopping &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header-container">
        <h1 className="cart-page-title">Shopping Cart</h1>
      </div>

      <div className="cart-container">
        {/* Left Side: Cart Items List */}
        <div className="cart-items-column">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="cart-item-details">
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-size">Size: {item.size}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-selector cart-qty">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-item-pricing">
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.cartItemId)}>
                  <Trash2 size={18} />
                </button>
                <div className="cart-price-column">
                  <p className="cart-item-total">₹{item.price * item.quantity}</p>
                  <p className="cart-item-each">₹{item.price} each</p>
                </div>
              </div>
            </div>
          ))}

          <Link to="/catalogue" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>

        {/* Right Side: Order Summary */}
        <div className="cart-summary-column">
          <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Delivery</span>
              <span className="summary-value">₹{deliveryFee}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total-row">
              <span className="summary-total-label">Total</span>
              <span className="summary-total-value">₹{total}</span>
            </div>

            <Link to="/checkout" className="checkout-btn" style={{ textDecoration: "none" }}>
              Proceed to Checkout &rarr;
            </Link>

            <div className="promo-banner">
              <p>Free delivery on orders above ₹999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
