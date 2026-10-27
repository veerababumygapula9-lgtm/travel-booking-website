import React from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Search, Trash2, Users, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'wayfarer-bookings';
function loadBookings() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

export default function MyBookings() {
  const [bookings, setBookings] = useState(loadBookings);
  const [cancelId, setCancelId] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const sync = () => setBookings(loadBookings());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const remove = id => {
    const next = bookings.filter(booking => booking.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setBookings(next);
      setCancelId(null);
      setNotice('Booking removed from this browser.');
    } catch {
      setNotice('Could not update browser storage. Please try again.');
    }
  };

  return (
    <div className="page-shell bookings-page"><section className="bookings-hero"><div className="container bookings-hero-inner"><div><span className="eyebrow">YOUR TRAVEL JOURNAL</span><h1>Your journeys,<br /><em>all in one place.</em></h1><p>Keep track of the places you're heading to and the memories you're about to make.</p></div><div className="bookings-count-card"><span>YOUR COLLECTION</span><strong>{bookings.length.toString().padStart(2, '0')}</strong><small>{bookings.length === 1 ? 'trip booked' : 'trips booked'}</small></div></div></section>
      <section className="container bookings-content"><div className="bookings-section-heading"><div><span className="eyebrow">UP NEXT & BEYOND</span><h2>My bookings<span className="heading-count">{bookings.length}</span></h2></div><Link to="/destinations" className="button button-dark">Find another trip <ArrowRight size={16} /></Link></div>
        {notice && <div className="notice-message" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss message"><X size={15} /></button></div>}
        {bookings.length ? <div className="bookings-list">{bookings.map(booking => <article className="booking-card" key={booking.id}><img src={booking.image} alt={booking.destination} className="booking-card-image" /><div className="booking-card-main"><div className="booking-card-top"><span className="booking-status"><span /> {booking.status || 'Confirmed'}</span><span className="booking-ref">{booking.id}</span></div><h3>{booking.packageTitle}</h3><p className="booking-destination"><MapPin size={14} /> {booking.destination}</p><div className="booking-meta"><span><CalendarDays size={15} /> {new Date(`${booking.departure}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span><span><Users size={15} /> {booking.travelers} {booking.travelers === 1 ? 'traveler' : 'travelers'}</span></div></div><div className="booking-card-end"><span className="booking-total-label">TOTAL TRIP COST</span><strong>${Number(booking.total).toLocaleString('en-US')}</strong><button className="cancel-booking" onClick={() => setCancelId(booking.id)}><Trash2 size={14} /> Remove booking</button></div></article>)}</div> : <div className="empty-state bookings-empty"><span><Search size={25} /></span><h3>Your next story starts here.</h3><p>You don't have any saved trips yet. Find a destination that calls to you and your booking will appear here.</p><Link to="/destinations" className="button button-dark">Explore journeys <ArrowRight size={16} /></Link></div>}
      </section>
      {cancelId && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setCancelId(null); }}><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="remove-title"><button className="modal-close" onClick={() => setCancelId(null)} aria-label="Close"><X size={19} /></button><span className="modal-icon"><Trash2 size={22} /></span><h2 id="remove-title">Remove this booking?</h2><p>This will delete the saved booking from this browser. This demo does not contact a travel provider.</p><div className="modal-actions"><button className="button button-outline" onClick={() => setCancelId(null)}>Keep booking</button><button className="button button-danger" onClick={() => remove(cancelId)}>Remove booking</button></div></div></div>}
    </div>
  );
}