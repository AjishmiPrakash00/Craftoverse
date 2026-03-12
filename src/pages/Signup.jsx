import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import googleIcon from "../assets/google.svg";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const navigate = useNavigate();
    const { register, googleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        setIsLoading(true);
        const result = await register(name, email, password);

        if (!result.success) {
            setError(result.message);
        } else {
            setSuccessMsg("Account created successfully! Please check your email to confirm your account before logging in.");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
        setIsLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-header">
                <h1>Create Account</h1>
                <p>Sign up to start shopping at Craftoverse</p>
            </div>

            <div className="login-card">
                <form className="login-form" onSubmit={handleSignup}>
                    {error && <div style={{ color: "red", marginBottom: "10px", fontSize: "14px", textAlign: "center" }}>{error}</div>}
                    {successMsg && <div style={{ color: "green", marginBottom: "15px", fontSize: "14px", textAlign: "center", padding: "10px", backgroundColor: "#e2f8e9", borderRadius: "8px", border: "1px solid #b8e6ca" }}>{successMsg}</div>}

                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-with-icon">
                            <User className="input-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

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
                                placeholder="Create a password (min. 6 characters)"
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

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="input-with-icon">
                            <Lock className="input-icon" size={18} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                tabIndex="-1"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-btn" style={{ marginTop: "8px" }} disabled={isLoading}>
                        {isLoading ? <Loader2 size={18} className="spinner" /> : "Create Account"}
                    </button>

                    <p className="signup-prompt">
                        Already have an account? <Link to="/login" className="signup-link">Log In</Link>
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
        </div>
    );
}
