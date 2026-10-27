import React from 'react';
import { Compass, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { wishlist } = useWishlist();
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark"><Compass size={22} /></span>
          <span>wayfarer<span className="brand-dot">.</span></span>
        </Link>
        <button className="mobile-menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav className={open ? 'main-nav is-open' : 'main-nav'}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/destinations" onClick={close}>Destinations</NavLink>
          <NavLink to="/wishlist" onClick={close} className="wishlist-nav-link"><Heart size={15} /> Wishlist {wishlist.length > 0 && <span className="wishlist-nav-count">{wishlist.length}</span>}</NavLink>
          <NavLink to="/bookings" onClick={close}>My bookings</NavLink>
          <Link to="/destinations" className="nav-cta" onClick={close}>Explore trips <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}