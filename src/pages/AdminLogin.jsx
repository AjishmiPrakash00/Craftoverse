import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import "../index.css";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (email === "craftoverseofficial@gmail.com" && password === "Ajukri@1327") {
            // Set simple auth token in local storage for admin session
            localStorage.setItem("adminAuth", "true");
            navigate("/admin");
        } else {
            setError("Invalid admin credentials");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card" style={{ borderTop: "4px solid #2f9e91" }}>
                <div className="login-header">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <div style={{ background: '#e0f2f1', padding: '15px', borderRadius: '50%' }}>
                            <Lock size={32} color="#2f9e91" />
                        </div>
                    </div>
                    <h2>Admin Access</h2>
                    <p>Authorized personnel only</p>
                </div>

                {error && <div className="error-message" style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form className="login-form" onSubmit={handleAdminLogin}>
                    <div className="form-group">
                        <label>Admin Email</label>
                        <input
                            type="email"
                            placeholder="Enter official email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Master Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-btn" style={{ marginTop: '10px' }}>
                        Secure Login
                    </button>
                </form>
            </div>
        </div>
    );
}
