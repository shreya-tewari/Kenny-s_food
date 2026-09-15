import React, { useState, useMemo } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { MENU_ITEMS, CATEGORIES } from '../data/menuData'
import ProductCard from './ProductCard'
import { useApp } from '../context/AppContext'

const DIETARY_FILTERS = [
  { id: 'gf', label: 'Gluten Free' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'new', label: 'New Items' },
  { id: 'bestseller', label: 'Bestsellers' },
]

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating',  label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function MenuGrid() {
  const { openProductDetail, searchQuery } = useApp()
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeDietary, setActiveDietary] = useState([])
  const [sortBy, setSortBy] = useState('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggleDietary = (id) => {
    setActiveDietary(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const filteredItems = useMemo(() => {
    let items = [...MENU_ITEMS]

    // Category filter
    if (activeCategory !== 'all') {
      items = items.filter(i => i.category === activeCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.shortDesc.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // Dietary filters
    if (activeDietary.includes('gf'))
      items = items.filter(i => i.tags.some(t => t.toUpperCase().includes('GF')))
    if (activeDietary.includes('vegan'))
      items = items.filter(i => i.tags.some(t => t.toLowerCase() === 'vegan'))
    if (activeDietary.includes('spicy'))
      items = items.filter(i => i.tags.some(t => t.toLowerCase() === 'spicy'))
    if (activeDietary.includes('new'))
      items = items.filter(i => i.isNew)
    if (activeDietary.includes('bestseller'))
      items = items.filter(i => i.isBestseller)

    // Sort
    switch (sortBy) {
      case 'rating':
        items.sort((a, b) => b.rating - a.rating)
        break
      case 'price-asc':
        items.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        items.sort((a, b) => b.price - a.price)
        break
      default: // popular — bestsellers first
        items.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.reviewCount - a.reviewCount)
    }

    return items
  }, [activeCategory, searchQuery, activeDietary, sortBy])

  const clearFilters = () => {
    setActiveDietary([])
    setActiveCategory('all')
    setSortBy('popular')
  }

  const activeFilterCount = activeDietary.length + (activeCategory !== 'all' ? 1 : 0)

  return (
    <section
      id="menu-section"
      className="section"
      style={{ background: 'var(--color-cream)' }}
      aria-label="Menu"
    >
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: '32px' }}>
          <h2 className="section-title">
            {searchQuery ? `Results for "${searchQuery}"` : 'Our Menu'}
          </h2>
          <p className="section-subtitle">
            Fresh, made-to-order. Eat in, pickup, or delivery.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '24px',
          scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              aria-label={`Filter by ${cat.label}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter + Sort bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          {/* Filter toggle */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setFiltersOpen(o => !o)}
            aria-expanded={filtersOpen}
            id="toggle-filters"
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span style={{
                background: 'var(--color-gold)',
                color: 'var(--color-charcoal)',
                borderRadius: '99px',
                padding: '1px 7px',
                fontSize: '11px',
                fontWeight: 700,
              }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Active dietary chips */}
          {activeDietary.map(id => {
            const f = DIETARY_FILTERS.find(d => d.id === id)
            return (
              <button
                key={id}
                onClick={() => toggleDietary(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  background: 'var(--color-gold-pale)',
                  border: '1.5px solid var(--color-gold)',
                  borderRadius: '99px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-charcoal)',
                  cursor: 'pointer',
                }}
              >
                {f?.label}
                <X size={11} />
              </button>
            )
          })}

          {activeFilterCount > 0 && (
            <button className="btn-ghost btn-sm" onClick={clearFilters}>
              Clear all
            </button>
          )}

          {/* Spacer */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-sage)', whiteSpace: 'nowrap' }}>
              {filteredItems.length} items
            </span>
            {/* Sort */}
            <div className="input-wrapper" style={{ minWidth: '180px' }}>
              <select
                className="form-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ padding: '8px 36px 8px 12px', fontSize: '13px' }}
                aria-label="Sort menu items"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Expanded filters panel */}
        {filtersOpen && (
          <div style={{
            background: 'white',
            border: '1px solid var(--color-taupe)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            marginBottom: '24px',
            animation: 'fadeInDown 0.2s ease',
          }}>
            <h4 style={{ marginBottom: '14px', color: 'var(--color-charcoal)', fontSize: '14px' }}>
              Dietary & Tags
            </h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {DIETARY_FILTERS.map(f => (
                <label key={f.id} className="form-check" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={activeDietary.includes(f.id)}
                    onChange={() => toggleDietary(f.id)}
                    style={{ accentColor: 'var(--color-gold)', width: '16px', height: '16px' }}
                  />
                  <span className="form-check-label">{f.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {filteredItems.map((product, idx) => (
              <div
                key={product.id}
                className="anim-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <ProductCard
                  product={product}
                  onCardClick={openProductDetail}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div style={{ fontSize: '48px' }}>🍽️</div>
            <h3 className="empty-state__title">No items found</h3>
            <p className="empty-state__desc">
              Try adjusting your search or filters to find something delicious.
            </p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
