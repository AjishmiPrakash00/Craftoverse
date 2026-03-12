import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import googleIcon from "../assets/google.svg";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login, googleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Check if there's an error param in URL from OAuth failure
        const params = new URLSearchParams(window.location.search);
        if (params.get('error')) {
            setError("Authentication failed. Please try again.");
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const result = await login(email, password);

        if (!result.success) {
            setError(result.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-header">
                <h1>Welcome Back</h1>
                <p>Log in to continue shopping</p>
            </div>

            <div className="login-card">
                <form className="login-form" onSubmit={handleLogin}>
                    {error && <div style={{ color: "red", marginBottom: "10px", fontSize: "14px", textAlign: "center" }}>{error}</div>}

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock className="input-icon" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-actions">
                        <a href="#" className="forgot-password-link">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? <Loader2 size={18} className="spinner" /> : "Log In"}
                    </button>

                    <p className="signup-prompt">
                        Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                    </p>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-btn" onClick={googleLogin}>
                            <img src={googleIcon} alt="Google" className="social-icon" />
                            Continue with Google
                        </button>
                    </div>
                </form>
            </div>

            <div className="login-footer">
                <Link to="/" className="back-to-shop-link">
                    ← Back to shopping
                </Link>
            </div>
        </div>
    );
}
