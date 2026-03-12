import { useEffect } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section contact-section">
      <div className="hero contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </div>

      {/* Info Cards Row */}
      <div className="contact-info-cards">
        <div className="info-card card">
          <div className="info-icon teal-icon">
            <Mail size={24} />
          </div>
          <h3>Email</h3>
          <p>Send us an email anytime</p>
          <a href="mailto:craftoverseofficial@gmail.com">craftoverseofficial@gmail.com</a>
        </div>

        <div className="info-card card">
          <div className="info-icon pink-icon">
            <Phone size={24} />
          </div>
          <h3>Phone</h3>
          <p>Mon-Sat 10AM to 7PM</p>
          <a href="tel:+918138901292">+91 81389 01292</a>
        </div>

        <div className="info-card card">
          <div className="info-icon yellow-icon">
            <MapPin size={24} />
          </div>
          <h3>Location</h3>
          <p>Craftoverse Studio</p>
          <p>Angamaly, Kerala</p>
          <p>India</p>
        </div>
      </div>

      <div className="contact-container">
        {/* Left Column - Form */}
        <div className="custom-form-card card contact-form-wrapper">
          <h2>Send us a Message</h2>
          <form className="custom-form contact-form">
            <div className="form-group">
              <label>Your Name *</label>
              <input type="text" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="your@email.com" required />
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input type="text" placeholder="What is this about?" required />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                rows="6"
                placeholder="Tell us more about your inquiry..."
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" onClick={(e) => e.preventDefault()}>
              Send Message
            </button>
          </form>
        </div>

        {/* Right Column - Additional Info */}
        <div className="contact-sidebar">
          {/* FAQs Card */}
          <div className="faqs-card card">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <strong>What is your shipping policy?</strong>
                <p>We ship all orders within 1-2 business days. Standard delivery takes 5-7 business days across India.</p>
              </div>
              <div className="faq-item">
                <strong>Do you accept returns?</strong>
                <p>Yes! We accept returns within 7 days of delivery for damaged or defective products.</p>
              </div>
              <div className="faq-item">
                <strong>Can I track my order?</strong>
                <p>Yes, you'll receive a tracking number via email once your order is shipped.</p>
              </div>
              <div className="faq-item">
                <strong>How long does custom order take?</strong>
                <p>Custom orders typically take 7-10 business days from design approval to delivery.</p>
              </div>
            </div>
          </div>

          {/* Help Banner */}
          <div className="help-banner card">
            <h3>Need Immediate Help?</h3>
            <p>For urgent inquiries, call us directly during business hours.</p>
            <button className="call-now-btn">Call Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
