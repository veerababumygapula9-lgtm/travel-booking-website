import React from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, MapPin, Star, Users, CalendarDays, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { packages } from '../data/packages.js';
import NotFound from './NotFound.jsx';

export default function PackageDetails() {
  const { id } = useParams();
  const item = packages.find(pkg => pkg.id === id);
  if (!item) return <NotFound />;
  return (
    <div className="page-shell detail-page">
      <div className="container detail-breadcrumb"><Link to="/destinations"><ArrowLeft size={16} /> All journeys</Link><span>/</span><span>{item.destination}</span></div>
      <section className="container detail-hero"><div className="detail-image"><img src={item.image} alt={item.destination} /><span className="image-badge">{item.badge}</span></div><div className="detail-intro"><span className="eyebrow">{item.category.toUpperCase()} COLLECTION</span><h1>{item.title}</h1><p className="detail-location"><MapPin size={16} /> {item.destination}</p><div className="detail-rating"><Star size={16} fill="currentColor" /> <strong>{item.rating}</strong> <span>({item.reviews} traveler reviews)</span></div><p className="detail-description">{item.description}</p><div className="detail-stats"><div><Clock3 /><span><strong>{item.days} days</strong><small>{item.nights} nights</small></span></div><div><Users /><span><strong>Small group</strong><small>Up to 12 travelers</small></span></div><div><ShieldCheck /><span><strong>Carefully planned</strong><small>Local expertise</small></span></div></div><div className="detail-book-row"><div><span className="detail-price">${item.price.toLocaleString('en-US')}</span><small> / person</small><p>Taxes and fees included</p></div><Link to={`/book/${item.id}`} className="button button-dark">Book this trip <ArrowRight size={17} /></Link></div></div></section>
      <section className="container detail-content-grid"><div><div className="content-section"><span className="eyebrow">THE EXPERIENCE</span><h2>A journey to <em>remember.</em></h2><p>{item.description} We keep the logistics simple so you can focus on the experience, with knowledgeable local support and thoughtful details throughout.</p></div><div className="content-section"><span className="eyebrow">YOUR JOURNEY</span><h2>The itinerary.</h2><div className="itinerary-list">{item.itinerary.map((day, index) => <div className="itinerary-item" key={day[0]}><div className="itinerary-marker"><span>{String(index + 1).padStart(2, '0')}</span></div><div><h3>{day[0]}</h3><p>{day[1]}</p></div></div>)}</div></div></div><aside className="included-card"><span className="eyebrow">THE DETAILS</span><h3>What's included</h3><p>Little details, already taken care of.</p><ul>{item.includes.map(included => <li key={included}><span><Check size={14} /></span>{included}</li>)}</ul><div className="included-note"><ShieldCheck size={19} /><span><strong>Book with confidence</strong><small>Clear pricing and a thoughtfully planned trip.</small></span></div><Link to={`/book/${item.id}`} className="button button-dark button-full">Reserve your place <ArrowRight size={17} /></Link></aside></section>
    </div>
  );
}