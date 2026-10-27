import React from 'react';
import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="not-found container"><span className="not-found-icon"><Compass size={30} /></span><span className="eyebrow">OFF THE MAP</span><h1>Looks like this<br /><em>path wandered.</em></h1><p>We couldn't find that page. Let's get you back to somewhere lovely.</p><Link to="/" className="button button-dark">Back to home <span>→</span></Link></section>;
}