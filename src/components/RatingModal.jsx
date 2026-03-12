import { useState } from "react";
import { Star, X } from "lucide-react";
import "../index.css";

export default function RatingModal({ isOpen, onClose }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setSubmitted(false);
            setRating(0);
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div className="login-card" style={{ maxWidth: '400px', width: '100%', position: 'relative', animation: 'fadeIn 0.3s ease' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#777' }}
                >
                    <X size={20} />
                </button>

                {!submitted ? (
                    <>
                        <div className="login-header" style={{ marginBottom: '20px' }}>
                            <h2>Rate Your Experience</h2>
                            <p>How did we do on your recent order?</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '30px 0' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(rating)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0,
                                        transition: 'transform 0.2s',
                                        transform: (hover || rating) >= star ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                >
                                    <Star
                                        size={40}
                                        color={(hover || rating) >= star ? "#f1c40f" : "#ddd"}
                                        fill={(hover || rating) >= star ? "#f1c40f" : "transparent"}
                                    />
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <textarea
                                    placeholder="Tell us more about your experience (optional)"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="login-btn"
                                disabled={rating === 0}
                                style={{ opacity: rating === 0 ? 0.6 : 1, marginTop: '10px' }}
                            >
                                Submit Feedback
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                        <div style={{ color: '#2f9e91', marginBottom: '20px' }}>
                            <Star size={60} fill="#f1c40f" color="#f1c40f" style={{ animation: 'popIn 0.5s ease' }} />
                        </div>
                        <h2>Thank You!</h2>
                        <p style={{ color: '#555', marginTop: '10px' }}>Your feedback helps us improve our Craftoverse experience.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
