import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, MapPin, ArrowUpRight, RotateCcw } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { packages, categories } from '../data/packages.js';
import PackageCard from '../components/PackageCard.jsx';

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [budget, setBudget] = useState(searchParams.get('budget') || 'Any budget');
  const [sort, setSort] = useState('Recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || 'All');
    setBudget(searchParams.get('budget') || 'Any budget');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = packages.filter(item => {
      const query = search.trim().toLowerCase();
      const matchesSearch = !query || `${item.title} ${item.destination} ${item.country} ${item.category}`.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || item.category === category;
      const matchesBudget = budget === 'Any budget' || (budget === 'Under $800' && item.price < 800) || (budget === '$800–$1,200' && item.price >= 800 && item.price <= 1200) || (budget === '$1,200+' && item.price > 1200);
      return matchesSearch && matchesCategory && matchesBudget;
    });
    if (sort === 'Price: low to high') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'Price: high to low') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'Top rated') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, category, budget, sort]);

  const reset = () => { setSearch(''); setCategory('All'); setBudget('Any budget'); setSort('Recommended'); setSearchParams({}); };
  const updateCategory = value => { setCategory(value); const next = {}; if (search) next.search = search; if (value !== 'All') next.category = value; if (budget !== 'Any budget') next.budget = budget; setSearchParams(next); };
  const updateBudget = value => { setBudget(value); const next = {}; if (search) next.search = search; if (category !== 'All') next.category = category; if (value !== 'Any budget') next.budget = value; setSearchParams(next); };

  return (
    <div className="page-shell">
      <section className="destinations-hero"><div className="container destinations-hero-inner"><div><span className="eyebrow"><MapPin size={14} /> FIND YOUR SOMEWHERE</span><h1>Every journey<br />starts <em>somewhere.</em></h1><p>Explore places that spark your curiosity and find the trip that feels like you.</p></div><div className="destinations-hero-image"><img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=85" alt="Colorful Italian coastal village" /><span>THE WORLD, OPEN TO YOU</span></div></div></section>
      <section className="container listing-section">
        <div className="listing-topline"><div><span className="eyebrow">THE COLLECTION</span><h2>Find your next <em>escape.</em></h2></div><span className="results-count">{filtered.length} {filtered.length === 1 ? 'journey' : 'journeys'} to explore</span></div>
        <div className="search-toolbar"><label className="search-field"><Search size={19} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search destinations, experiences..." aria-label="Search destinations" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button>}</label><button className={`filter-toggle ${filtersOpen ? 'active' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={17} /> Filters</button><label className="sort-field"><span>Sort by</span><select value={sort} onChange={e => setSort(e.target.value)}><option>Recommended</option><option>Price: low to high</option><option>Price: high to low</option><option>Top rated</option></select></label></div>
        <div className={`filters-panel ${filtersOpen ? 'filters-open' : ''}`}><div className="filter-group"><span className="filter-label">Experience</span><div className="filter-chips">{categories.map(item => <button key={item} onClick={() => updateCategory(item)} className={category === item ? 'filter-chip selected' : 'filter-chip'}>{item}</button>)}</div></div><div className="filter-group"><label className="filter-label" htmlFor="budget">Budget per person</label><select id="budget" value={budget} onChange={e => updateBudget(e.target.value)} className="budget-select"><option>Any budget</option><option>Under $800</option><option>$800–$1,200</option><option>$1,200+</option></select></div><button className="reset-filters" onClick={reset}><RotateCcw size={14} /> Reset filters</button></div>
        {filtered.length ? <div className="package-grid listing-grid">{filtered.map(item => <PackageCard key={item.id} item={item} />)}</div> : <div className="empty-state"><span><Search size={25} /></span><h3>No journeys found</h3><p>Try another destination or clear some filters to discover more trips.</p><button className="button button-dark" onClick={reset}>Clear all filters <RotateCcw size={16} /></button></div>}
      </section>
      <section className="mini-cta"><div className="container mini-cta-inner"><div><span className="eyebrow">NEED A LITTLE INSPIRATION?</span><h2>Your kind of trip is out there.</h2></div><Link to="/" className="text-link">See how we travel <ArrowUpRight size={16} /></Link></div></section>
    </div>
  );
}