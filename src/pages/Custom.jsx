import { useEffect } from "react";
import { Upload, Box, Palette, Mail } from "lucide-react";
import customIcon from "../assets/custom.svg";
import { Link } from "react-router-dom";

export default function Custom() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section custom-section">
      <div className="hero custom-hero">
        <div className="hero-icon-wrapper">
          <img src={customIcon} alt="Custom Layout Icon" />
        </div>
        <h1>Custom Orders</h1>
        <p>
          Bring your unique ideas to life! We create custom stickers and posters
          tailored to your vision.
        </p>
      </div>

      <div className="custom-container">
        {/* Left Column - Form */}
        <div className="custom-form-card card">
          <h2>Request a Custom Design</h2>
          <form className="custom-form">
            <div className="form-group">
              <label>Your Name *</label>
              <input type="text" placeholder="Enter your name" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input type="tel" placeholder="10-digit number" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Product Type *</label>
                <select required>
                  <option value="stickers">Stickers</option>
                  <option value="posters">Posters</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity *</label>
                <input type="text" placeholder="Minimum 10 units" required />
              </div>
            </div>

            <div className="form-group">
              <label>Design Description *</label>
              <textarea
                rows="4"
                placeholder="Describe your design idea, preferred colors, style, size, and any other details..."
                required
              ></textarea>
            </div>

            <div className="file-upload-notice">
              <Upload size={18} className="upload-icon" />
              <div className="notice-text">
                <strong>Need to share design files?</strong>
                <p>
                  After submitting, we'll send you an email where you can attach
                  your design files or reference images.
                </p>
              </div>
            </div>

            <button type="submit" className="submit-btn" onClick={(e) => e.preventDefault()}>
              Submit Request
            </button>
          </form>
        </div>

        {/* Right Column */}
        <div className="custom-sidebar">
          {/* How It Works Card */}
          <div className="how-it-works-card card">
            <h2>How It Works</h2>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-circle step-teal">1</div>
                <div className="step-info">
                  <strong>Share Your Idea</strong>
                  <p>
                    Fill out the form with your design requirements and
                    specifications.
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-circle step-pink">2</div>
                <div className="step-info">
                  <strong>Get a Quote</strong>
                  <p>
                    We'll review your request and send you a detailed quote
                    within 24 hours.
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-circle step-yellow">3</div>
                <div className="step-info">
                  <strong>Design & Approval</strong>
                  <p>
                    Our designers will create mockups for your approval before
                    production.
                  </p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-circle step-teal-dark">4</div>
                <div className="step-info">
                  <strong>Production & Delivery</strong>
                  <p>
                    Once approved, we'll print and ship your custom order to
                    your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="custom-features-card card">
            <h2>Custom Order Features</h2>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon teal-icon">
                  <Box size={20} />
                </div>
                <div className="feature-info">
                  <strong>Bulk Discounts</strong>
                  <p>Special pricing for orders above 50 units</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon pink-icon">
                  <Palette size={20} />
                </div>
                <div className="feature-info">
                  <strong>Unlimited Revisions</strong>
                  <p>We'll refine the design until you're 100% satisfied</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon yellow-icon">
                  <Mail size={20} />
                </div>
                <div className="feature-info">
                  <strong>Fast Turnaround</strong>
                  <p>Production completed in 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Banner */}
          <div className="questions-banner card">
            <p>Have questions about custom orders?</p>
            <Link to="/contact" className="contact-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
