import React from 'react';
import { ArrowUpRight, Clock3, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist.js';

export default function PackageCard({ item }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const saved = isWishlisted(item.id);

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(item.id);
  };

  return (
    <article className="package-card">
      <Link to={`/packages/${item.id}`} className="package-image-wrap" aria-label={`View ${item.title}`}>
        <img src={item.image} alt={item.destination} className="package-image" loading="lazy" />
        {item.badge && <span className="image-badge">{item.badge}</span>}
        <span className="image-arrow"><ArrowUpRight size={19} /></span>
      </Link>
      <button type="button" className={saved ? 'wishlist-toggle is-saved' : 'wishlist-toggle'} onClick={handleWishlist} aria-label={saved ? `Remove ${item.title} from wishlist` : `Add ${item.title} to wishlist`} aria-pressed={saved} title={saved ? 'Remove from wishlist' : 'Add to wishlist'}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button>
      <div className="package-card-body">
        <div className="package-card-meta"><span><Star size={14} fill="currentColor" /> {item.rating} <span className="muted">({item.reviews})</span></span><span><Clock3 size={14} /> {item.days} days</span></div>
        <p className="package-destination">{item.destination}</p>
        <Link to={`/packages/${item.id}`} className="package-title">{item.title}</Link>
        <div className="package-card-bottom"><span className="package-price"><strong>${item.price.toLocaleString('en-US')}</strong><small> / person</small></span><Link className="small-link" to={`/packages/${item.id}`}>View trip <span>→</span></Link></div>
      </div>
    </article>
  );
}