import React from 'react';
import { Compass, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark"><Compass size={21} /></span>
            <span>wayfarer<span className="brand-dot">.</span></span>
          </Link>
          <p>Thoughtful trips for curious people. Find your next story with us.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href="mailto:hello@wayfarer.example" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/destinations">Destinations</Link>
          <Link to="/destinations?category=Adventure">Adventure trips</Link>
          <Link to="/destinations?category=Culture">Culture trips</Link>
        </div>
        <div>
          <h4>Your trip</h4>
          <Link to="/bookings">My bookings</Link>
          <Link to="/destinations">Find a package</Link>
          <a href="mailto:hello@wayfarer.example">Contact us</a>
        </div>
        <div className="footer-note">
          <span className="eyebrow">GO SOMEWHERE NEW</span>
          <h3>The world is waiting.</h3>
          <p>Make room for a little wonder.</p>
          <Link to="/destinations" className="text-link">Find your escape <span>→</span></Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Wayfarer Travel Co.</span>
        <span>Made for the journey.</span>
      </div>
    </footer>
  );
}
