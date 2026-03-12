import { Package, Truck, CheckCircle, PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Tracking() {
    return (
        <div className="login-page">
            <div className="login-card tracking-card" style={{ maxWidth: "600px", width: "100%", padding: "40px 30px" }}>
                <div className="login-header" style={{ marginBottom: "30px" }}>
                    <PackageOpen size={48} color="#2f9e91" style={{ marginBottom: "15px" }} />
                    <h2>Track Your Order</h2>
                    <p>Order #CRAFT-849201</p>
                </div>

                <div className="tracking-status" style={{ background: "#fdfaf6", padding: "20px", borderRadius: "12px", border: "1px solid #eee", marginBottom: "30px" }}>
                    <h4 style={{ margin: "0 0 15px 0", color: "#1f3f3b" }}>Latest Update</h4>
                    <p style={{ margin: "0 0 5px 0", color: "#333", fontWeight: "600" }}>Out for delivery</p>
                    <p style={{ margin: "0", color: "#777", fontSize: "0.9rem" }}>Your package is arriving today by 8:00 PM.</p>
                </div>

                <div className="tracking-timeline" style={{ paddingLeft: "20px" }}>
                    <div className="timeline-item active" style={{ display: "flex", gap: "20px", marginBottom: "25px", position: "relative" }}>
                        <div className="timeline-icon" style={{ background: "#2f9e91", color: "white", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                            <Truck size={16} />
                        </div>
                        <div className="timeline-content">
                            <h5 style={{ margin: "0 0 5px 0", color: "#1f3f3b" }}>Out for Delivery</h5>
                            <p style={{ margin: "0", fontSize: "0.85rem", color: "#777" }}>Today, 09:14 AM - Courier facility</p>
                        </div>
                    </div>

                    <div className="timeline-item past" style={{ display: "flex", gap: "20px", marginBottom: "25px", position: "relative" }}>
                        <div className="timeline-icon" style={{ background: "#e5ddd5", color: "#777", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                            <Package size={16} />
                        </div>
                        <div className="timeline-content">
                            <h5 style={{ margin: "0 0 5px 0", color: "#555" }}>Shipped</h5>
                            <p style={{ margin: "0", fontSize: "0.85rem", color: "#999" }}>Yesterday, 04:30 PM - Mumbai Hub</p>
                        </div>
                    </div>

                    <div className="timeline-item past" style={{ display: "flex", gap: "20px", position: "relative" }}>
                        <div className="timeline-icon" style={{ background: "#e5ddd5", color: "#777", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                            <CheckCircle size={16} />
                        </div>
                        <div className="timeline-content">
                            <h5 style={{ margin: "0 0 5px 0", color: "#555" }}>Order Confirmed</h5>
                            <p style={{ margin: "0", fontSize: "0.85rem", color: "#999" }}>Oct 12, 11:20 AM - Payment received</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "40px", textAlign: "center" }}>
                    <Link to="/" className="login-btn" style={{ textDecoration: "none", display: "inline-block" }}>
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
