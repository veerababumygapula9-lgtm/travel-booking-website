import React from 'react';
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, CircleCheck, CreditCard, MapPin, Minus, Plus, ShieldCheck, Users } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { packages } from '../data/packages.js';
import NotFound from './NotFound.jsx';

const STORAGE_KEY = 'wayfarer-bookings';
const today = new Date();
const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

function readBookings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = packages.find(pkg => pkg.id === id);
  const [travelers, setTravelers] = useState(2);
  const [departure, setDeparture] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [complete, setComplete] = useState(null);
  const total = useMemo(() => item ? item.price * travelers : 0, [item, travelers]);

  if (!item) return <NotFound />;

  const validate = () => {
    const next = {};
    if (name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.';
    if (phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number.';
    if (!departure || departure < localDate) next.departure = 'Choose a date today or later.';
    if (!accepted) next.accepted = 'Please confirm the booking details.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = event => {
    event.preventDefault();
    if (!validate()) return;
    const booking = {
      id: `WF-${Date.now().toString(36).toUpperCase()}`,
      packageId: item.id,
      packageTitle: item.title,
      destination: item.destination,
      image: item.image,
      departure,
      travelers,
      pricePerPerson: item.price,
      total,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      requests: requests.trim(),
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    try {
      const updated = [booking, ...readBookings()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setComplete(booking);
      setErrors({});
    } catch {
      setErrors({ form: 'We could not save this booking in your browser. Check your browser storage settings and try again.' });
    }
  };

  if (complete) {
    return <section className="confirmation-page"><div className="confirmation-card"><span className="confirmation-icon"><CheckCircle2 size={36} /></span><span className="eyebrow">IT'S OFFICIAL</span><h1>Your next adventure<br /><em>starts here.</em></h1><p>Your trip to {complete.destination} has been saved. Your booking reference is below.</p><div className="confirmation-reference"><span>BOOKING REFERENCE</span><strong>{complete.id}</strong></div><div className="confirmation-summary"><img src={complete.image} alt={complete.destination} /><div><strong>{complete.packageTitle}</strong><span>{new Date(`${complete.departure}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })} · {complete.travelers} {complete.travelers === 1 ? 'traveler' : 'travelers'}</span><b>${complete.total.toLocaleString('en-US')}</b></div></div><button className="button button-dark button-full" onClick={() => navigate('/bookings')}>View my bookings <ArrowRight size={17} /></button><Link to="/" className="confirmation-home">Back to home</Link></div></section>;
  }

  return (
    <div className="page-shell booking-page"><div className="container booking-container"><div className="detail-breadcrumb"><Link to={`/packages/${item.id}`}><ArrowLeft size={16} /> Back to trip details</Link><span>/</span><span>Booking</span></div><div className="booking-heading"><span className="eyebrow">ONE STEP CLOSER</span><h1>Make it <em>happen.</em></h1><p>Tell us a little about your trip. Your next story is waiting.</p></div><div className="booking-layout"><form className="booking-form" onSubmit={submit} noValidate><section className="form-section"><div className="form-section-title"><span className="step-number">01</span><div><h2>Your details</h2><p>Who should we contact about this booking?</p></div></div><div className="form-grid"><label className="field full-field">Full name<input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex Morgan" autoComplete="name" aria-invalid={!!errors.name} />{errors.name && <small className="field-error">{errors.name}</small>}</label><label className="field">Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="alex@example.com" autoComplete="email" aria-invalid={!!errors.email} />{errors.email && <small className="field-error">{errors.email}</small>}</label><label className="field">Phone number<input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 123 4567" autoComplete="tel" aria-invalid={!!errors.phone} />{errors.phone && <small className="field-error">{errors.phone}</small>}</label></div></section><section className="form-section"><div className="form-section-title"><span className="step-number">02</span><div><h2>Plan your trip</h2><p>Pick your preferred departure and group size.</p></div></div><div className="form-grid"><label className="field">Departure date<span className="input-icon-wrap"><CalendarDays size={17} /><input type="date" min={localDate} value={departure} onChange={e => setDeparture(e.target.value)} aria-invalid={!!errors.departure} /></span>{errors.departure && <small className="field-error">{errors.departure}</small>}</label><div className="field"><span>Travelers</span><div className="traveler-stepper"><span><Users size={17} /> Adults</span><div><button type="button" aria-label="Remove traveler" onClick={() => setTravelers(v => Math.max(1, v - 1))} disabled={travelers <= 1}><Minus size={15} /></button><strong>{travelers}</strong><button type="button" aria-label="Add traveler" onClick={() => setTravelers(v => Math.min(12, v + 1))} disabled={travelers >= 12}><Plus size={15} /></button></div></div><small className="field-hint">1–12 travelers per booking</small></div><label className="field full-field">Special requests <span className="optional-label">Optional</span><textarea value={requests} onChange={e => setRequests(e.target.value)} placeholder="Anything you'd like us to know?" rows="3" maxLength="500" /></label></div></section><section className="form-section final-form-section"><label className="terms-check"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} /><span><CircleCheck size={18} /></span><span>I have reviewed my trip details and agree to the booking terms.</span></label>{errors.accepted && <small className="field-error">{errors.accepted}</small>}{errors.form && <p className="form-error">{errors.form}</p>}<button className="button button-dark button-full submit-booking" type="submit">Confirm booking · ${total.toLocaleString('en-US')} <ArrowRight size={17} /></button><p className="form-safe-note"><ShieldCheck size={15} /> Demo booking only — no payment is collected.</p></section></form><aside className="booking-summary"><span className="eyebrow">YOUR GETAWAY</span><div className="summary-image"><img src={item.image} alt={item.destination} /></div><div className="summary-package"><h3>{item.title}</h3><p><MapPin size={14} /> {item.destination}</p><p><CalendarDays size={14} /> {item.days} days · {item.nights} nights</p></div><div className="summary-line"><span>Price per person</span><strong>${item.price.toLocaleString('en-US')}</strong></div><div className="summary-line"><span>Travelers</span><strong>× {travelers}</strong></div><div className="summary-line total-line"><span>Total price</span><strong>${total.toLocaleString('en-US')}</strong></div><p className="summary-includes"><CheckCircle2 size={15} /> Taxes and listed inclusions are included.</p><div className="summary-assurance"><ShieldCheck size={18} /><span><strong>Peace of mind</strong><small>Your booking is stored locally in this demo.</small></span></div></aside></div></div></div>
  );
}