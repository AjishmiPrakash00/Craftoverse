import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";

export default function Checkout() {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [addressData, setAddressData] = useState({
        fullName: "",
        phone: "",
        email: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("upi");

    useEffect(() => {
        window.scrollTo(0, 0);
        // Redirect if cart is empty
        if (cartItems.length === 0) {
            navigate("/cart");
        }
    }, [cartItems, navigate]);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const deliveryFee = 50;
    const total = subtotal + deliveryFee;

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handlePaymentSubmit = () => {
        // Mocking a successful payment completion
        addOrder({
            customerName: addressData.fullName,
            email: addressData.email,
            phone: addressData.phone,
            address: `${addressData.addressLine}, ${addressData.city}, ${addressData.state} - ${addressData.pincode}`,
            items: cartItems,
            totalPrice: total,
            paymentMethod: paymentMethod
        });
        clearCart();
        alert(`Payment of ₹${total} successful! Re-directing to Home...`);
        navigate("/");
    };

    if (cartItems.length === 0) return null;

    return (
        <div className="login-page checkout-wrapper">
            <div className="checkout-container">
                {/* Progress Bar */}
                <div className="checkout-progress">
                    <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
                        <div className="step-circle">
                            {step > 1 ? <Check size={16} /> : "1"}
                        </div>
                        <span>Address</span>
                    </div>
                    <div className={`progress-line ${step >= 2 ? "active" : ""}`}></div>
                    <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
                        <div className="step-circle">2</div>
                        <span>Payment</span>
                    </div>
                </div>

                <div className="checkout-content">
                    {/* Left Column: Form/Payment */}
                    <div className="checkout-main">
                        {step === 1 ? (
                            <div className="checkout-card">
                                <h2 className="checkout-title">
                                    <span className="title-icon">📍</span> Delivery Address
                                </h2>
                                <form className="checkout-form" onSubmit={handleAddressSubmit}>
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            required
                                            value={addressData.fullName}
                                            onChange={(e) =>
                                                setAddressData({ ...addressData, fullName: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Phone Number *</label>
                                            <input
                                                type="tel"
                                                placeholder="10-digit mobile number"
                                                required
                                                pattern="[0-9]{10}"
                                                value={addressData.phone}
                                                onChange={(e) =>
                                                    setAddressData({ ...addressData, phone: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                required
                                                value={addressData.email}
                                                onChange={(e) =>
                                                    setAddressData({ ...addressData, email: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Address Line *</label>
                                        <input
                                            type="text"
                                            placeholder="House No, Building Name, Street"
                                            required
                                            value={addressData.addressLine}
                                            onChange={(e) =>
                                                setAddressData({
                                                    ...addressData,
                                                    addressLine: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="form-row three-cols">
                                        <div className="form-group">
                                            <label>City *</label>
                                            <input
                                                type="text"
                                                placeholder="City"
                                                required
                                                value={addressData.city}
                                                onChange={(e) =>
                                                    setAddressData({ ...addressData, city: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>State *</label>
                                            <input
                                                type="text"
                                                placeholder="State"
                                                required
                                                value={addressData.state}
                                                onChange={(e) =>
                                                    setAddressData({ ...addressData, state: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Pincode *</label>
                                            <input
                                                type="text"
                                                placeholder="6-digit pincode"
                                                required
                                                pattern="[0-9]{6}"
                                                value={addressData.pincode}
                                                onChange={(e) =>
                                                    setAddressData({
                                                        ...addressData,
                                                        pincode: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="login-btn checkout-submit-btn">
                                        Continue to Payment &rarr;
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="payment-step-container">
                                <div className="checkout-card address-summary-card">
                                    <div className="address-summary-header">
                                        <h2 className="checkout-title">Delivery Address</h2>
                                        <button
                                            className="change-btn"
                                            onClick={() => setStep(1)}
                                        >
                                            Change
                                        </button>
                                    </div>
                                    <div className="address-details">
                                        <p className="address-name">{addressData.fullName}</p>
                                        <p>{addressData.addressLine}</p>
                                        <p>
                                            {addressData.city}, {addressData.state} -{" "}
                                            {addressData.pincode}
                                        </p>
                                        <p className="address-contact">
                                            Phone: {addressData.phone}
                                        </p>
                                        <p className="address-contact">
                                            Email: {addressData.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="checkout-card payment-method-card">
                                    <h2 className="checkout-title">Payment Method</h2>

                                    <div className="payment-options">
                                        <label
                                            className={`payment-option ${paymentMethod === "upi" ? "selected" : ""
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="upi"
                                                checked={paymentMethod === "upi"}
                                                onChange={() => setPaymentMethod("upi")}
                                            />
                                            <div className="payment-option-content">
                                                <div className="payment-icon upi-icon">📱</div>
                                                <div className="payment-text">
                                                    <span className="payment-name">UPI</span>
                                                    <span className="payment-desc">
                                                        Pay using GPay, PhonePe, Paytm, etc.
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="radio-circle"></div>
                                        </label>

                                        <label
                                            className={`payment-option ${paymentMethod === "card" ? "selected" : ""
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === "card"}
                                                onChange={() => setPaymentMethod("card")}
                                            />
                                            <div className="payment-option-content">
                                                <div className="payment-icon card-icon">💳</div>
                                                <div className="payment-text">
                                                    <span className="payment-name">
                                                        Credit / Debit Card
                                                    </span>
                                                    <span className="payment-desc">
                                                        Visa, Mastercard, Rupay, Amex
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="radio-circle"></div>
                                        </label>

                                        <label
                                            className={`payment-option ${paymentMethod === "netbanking" ? "selected" : ""
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="netbanking"
                                                checked={paymentMethod === "netbanking"}
                                                onChange={() => setPaymentMethod("netbanking")}
                                            />
                                            <div className="payment-option-content">
                                                <div className="payment-icon bank-icon">🏦</div>
                                                <div className="payment-text">
                                                    <span className="payment-name">Net Banking</span>
                                                    <span className="payment-desc">
                                                        All major banks supported
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="radio-circle"></div>
                                        </label>
                                    </div>

                                    <div className="secure-badge">
                                        <ShieldCheck size={16} />
                                        <span>Your payment information is secured with 256-bit encryption</span>
                                    </div>

                                    <button
                                        className="login-btn checkout-submit-btn"
                                        onClick={handlePaymentSubmit}
                                    >
                                        Pay ₹{total}
                                    </button>
                                    <button
                                        className="back-btn"
                                        onClick={() => setStep(1)}
                                    >
                                        &larr; Back to Address
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="checkout-sidebar">
                        <div className="checkout-card order-summary-card checkout-summary-card">
                            <h2 className="summary-title">Order Summary</h2>

                            <div className="summary-items-list">
                                {cartItems.map((item) => (
                                    <div key={item.cartItemId} className="summary-item-row">
                                        <span className="summary-item-name">
                                            {item.title} ({item.size}) <span className="item-qty">x{item.quantity}</span>
                                        </span>
                                        <span className="summary-item-price">
                                            ₹{item.price * item.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-divider"></div>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
