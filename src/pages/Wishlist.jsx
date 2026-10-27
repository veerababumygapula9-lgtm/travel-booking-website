import React from 'react';
import { ArrowRight, Heart, MapPin, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PackageCard from '../components/PackageCard.jsx';
import { packages } from '../data/packages.js';
import { useWishlist } from '../hooks/useWishlist.js';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const savedPackages = wishlist
    .map((id) => packages.find((item) => String(item.id) === id))
    .filter(Boolean);

  return (
    <div className="page-shell wishlist-page">
      <section className="wishlist-hero">
        <div className="container wishlist-hero-inner">
          <div>
            <span className="eyebrow"><Heart size={14} /> YOUR PERSONAL COLLECTION</span>
            <h1>Trips to <em>dream about.</em></h1>
            <p>Save the journeys that catch your eye and come back when you're ready to go.</p>
          </div>
          <div className="wishlist-count"><Heart size={23} /><strong>{savedPackages.length.toString().padStart(2, '0')}</strong><span>saved {savedPackages.length === 1 ? 'journey' : 'journeys'}</span></div>
        </div>
      </section>

      <section className="container wishlist-content">
        <div className="wishlist-heading">
          <div><span className="eyebrow">SAVED FOR LATER</span><h2>Your wishlist</h2></div>
          <Link to="/destinations" className="text-link">Explore more trips <ArrowRight size={16} /></Link>
        </div>

        {savedPackages.length ? (
          <>
            <p className="wishlist-intro">Your saved journeys stay here even after you refresh this page.</p>
            <div className="package-grid wishlist-grid">
              {savedPackages.map((item) => (
                <div className="wishlist-card-wrap" key={item.id}>
                  <PackageCard item={item} />
                  <button className="wishlist-remove" type="button" onClick={() => toggleWishlist(item.id)}><Trash2 size={14} /> Remove from wishlist</button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state wishlist-empty">
            <span><Heart size={25} /></span>
            <h3>Your next favorite trip starts here.</h3>
            <p>Tap the heart on any travel package to save it here. Your wishlist is kept in this browser.</p>
            <Link to="/destinations" className="button button-dark"><MapPin size={16} /> Browse travel packages <ArrowRight size={16} /></Link>
          </div>
        )}
      </section>
    </div>
  );
}
