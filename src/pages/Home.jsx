import React from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Compass, Globe2, Heart, MapPin, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { packages, popularDestinations } from '../data/packages.js';
import PackageCard from '../components/PackageCard.jsx';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow"><Sparkles size={14} /> MADE FOR THE CURIOUS</span>
            <h1>Go beyond<br />the <em>ordinary.</em></h1>
            <p>Meaningful journeys, unforgettable places, and the kind of moments that stay with you long after you return.</p>
            <div className="hero-actions"><Link to="/destinations" className="button button-light">Explore destinations <ArrowUpRight size={18} /></Link><a href="#featured" className="hero-secondary">Discover our trips <ArrowDownRight size={17} /></a></div>
            <div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><div className="proof-stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div><small>Loved by 12,000+ travelers</small></div></div>
          </div>
          <div className="hero-caption"><span className="caption-line" /><span>Ubud, Bali</span><span>08°30' S · 115°15' E</span></div>
          <div className="hero-stamp"><Compass size={26} /><span>TAKE THE<br />SCENIC ROUTE</span></div>
        </div>
        <a href="#destinations" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} /></a>
      </section>

      <section className="trust-strip"><div className="container trust-grid"><div><Globe2 /><span><strong>40+ destinations</strong><small>Across the globe</small></span></div><div><ShieldCheck /><span><strong>Travel with confidence</strong><small>Thoughtfully planned</small></span></div><div><Heart /><span><strong>Made for you</strong><small>Small-group experiences</small></span></div><div><Check /><span><strong>Local expertise</strong><small>People who know</small></span></div></div></section>

      <section className="section container" id="destinations">
        <div className="section-heading"><div><span className="eyebrow">WHERE TO NEXT?</span><h2>Places that <em>move</em> you.</h2><p>From far-flung islands to mountain hideaways, your next favorite place is out there.</p></div><Link to="/destinations" className="text-link">All destinations <ArrowRight size={16} /></Link></div>
        <div className="destination-grid">{popularDestinations.map((destination, index) => <button key={destination.name} className={`destination-card destination-${index + 1}`} onClick={() => navigate(`/destinations?category=${encodeURIComponent(destination.category)}&search=${encodeURIComponent(destination.name === 'Switzerland' ? 'Switzerland' : destination.name === 'Japan' ? 'Japan' : destination.name === 'Italy' ? 'Italy' : 'Bali')}`)}><img src={destination.image} alt={destination.name} loading="lazy" /><span className="destination-overlay" /><span className="destination-count">{destination.count}</span><span className="destination-name">{destination.name}<small>{destination.country}</small></span><span className="destination-arrow"><ArrowUpRight size={19} /></span></button>)}</div>
      </section>

      <section className="section featured-section" id="featured"><div className="container"><div className="section-heading"><div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>Journeys worth <em>taking.</em></h2><p>Thoughtfully designed escapes, with the details taken care of.</p></div><Link to="/destinations" className="text-link">Explore all trips <ArrowRight size={16} /></Link></div><div className="package-grid">{packages.slice(0, 3).map(item => <PackageCard key={item.id} item={item} />)}</div></div></section>

      <section className="story-section"><div className="container story-grid"><div className="story-visual"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85" alt="Mountain lake surrounded by dramatic peaks" loading="lazy" /><div className="story-note"><span className="note-icon"><Compass size={21} /></span><div><strong>Travel a little deeper.</strong><small>Come back with a story.</small></div></div><span className="story-number">01 / THE WAYFARER WAY</span></div><div className="story-copy"><span className="eyebrow">MORE THAN A GETAWAY</span><h2>Travel that feels<br />like <em>something.</em></h2><p>We believe the best journeys aren't about ticking places off a list. They're about slowing down, finding a different perspective, and connecting with the world around you.</p><div className="story-points"><div><span>01</span><div><strong>Thoughtfully curated</strong><p>Every route is chosen for the moments that make it memorable.</p></div></div><div><span>02</span><div><strong>Rooted in local</strong><p>Meet the people, taste the flavors, and discover the stories.</p></div></div><div><span>03</span><div><strong>Room to wander</strong><p>A considered plan, with enough space for the unexpected.</p></div></div></div><Link to="/destinations" className="button button-dark">Find your next escape <ArrowUpRight size={17} /></Link></div></div></section>

      <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>The world is wide.<br /><em>Let's go see it.</em></h2></div><Link to="/destinations" className="button button-light">Start exploring <ArrowUpRight size={18} /></Link><span className="cta-orbit orbit-one" /><span className="cta-orbit orbit-two" /></div></section>
    </>
  );
}