import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Bell, User, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'

export default function Header() {
  const { itemCount } = useCart()
  const { openCart, searchQuery, setSearchQuery } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate('/')
      setTimeout(() => {
        const menuEl = document.getElementById('menu-section')
        if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <>
      <header
        className="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-sticky)',
          backgroundColor: scrolled ? 'rgba(15, 20, 25, 0.97)' : '#0F1419',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212, 197, 185, 0.12)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', height: '72px' }}>

            {/* Logo */}
            <Link
              to="/"
              style={{ textDecoration: 'none', flexShrink: 0 }}
              aria-label="Kenny's Pork Rolls — Home"
            >
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <span style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: '22px',
                  color: 'var(--color-cream)',
                  letterSpacing: '-0.02em',
                }}>
                  Kenny's <span style={{ color: 'var(--color-gold)' }}>Pork Rolls</span>
                </span>
                <span style={{
                  fontSize: '10px',
                  color: 'var(--color-sage)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}>
                  Filling Buns & Hearts
                </span>
              </div>
            </Link>

            {/* Search bar — desktop */}
            <form
              onSubmit={handleSearch}
              style={{ flex: 1, maxWidth: '480px', position: 'relative', display: 'flex' }}
              className="header-search-desktop"
            >
              <div className="input-wrapper" style={{ width: '100%' }}>
                <Search size={16} className="input-icon-left" style={{ color: 'var(--color-sage)' }} />
                <input
                  type="search"
                  className="search-bar"
                  placeholder="Search pork rolls, rice bowls, drinks…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="Search menu"
                  id="header-search"
                />
              </div>
            </form>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>

              {/* Mobile search toggle */}
              <button
                className="btn-icon header-mobile-search"
                onClick={() => setSearchOpen(o => !o)}
                aria-label="Search"
                style={{ color: 'var(--color-sage)' }}
              >
                <Search size={20} />
              </button>

              {/* Notifications */}
              <button
                className="btn-icon"
                aria-label="Notifications"
                style={{ color: 'var(--color-sage)', position: 'relative' }}
              >
                <Bell size={20} />
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  background: 'var(--color-gold)',
                  borderRadius: '50%',
                  border: '2px solid #0F1419',
                }} />
              </button>

              {/* Account */}
              <Link
                to="/account"
                className="btn-icon"
                aria-label="My Account"
                style={{ color: 'var(--color-sage)' }}
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <button
                className="btn-icon"
                onClick={openCart}
                aria-label={`Shopping cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
                style={{
                  color: 'var(--color-sage)',
                  position: 'relative',
                }}
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    minWidth: '18px',
                    height: '18px',
                    background: 'var(--color-gold)',
                    borderRadius: '9px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--color-charcoal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                    animation: 'bounceIn 0.3s ease',
                  }}>
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="btn-icon header-hamburger"
                onClick={() => setMobileMenuOpen(o => !o)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                style={{ color: 'var(--color-sage)' }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search bar */}
      {searchOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          background: '#0F1419',
          padding: '12px 16px',
          zIndex: 'calc(var(--z-sticky) - 1)',
          borderBottom: '1px solid rgba(212, 197, 185, 0.12)',
          animation: 'fadeInDown 0.2s ease',
        }}>
          <form onSubmit={handleSearch} className="input-wrapper">
            <Search size={16} className="input-icon-left" style={{ color: 'var(--color-sage)' }} />
            <input
              type="search"
              className="search-bar"
              placeholder="Search menu…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
              aria-label="Search menu mobile"
            />
          </form>
        </div>
      )}

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setMobileMenuOpen(false)}
            style={{ zIndex: 'calc(var(--z-sticky) + 1)' }}
          />
          <nav style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            background: '#0F1419',
            zIndex: 'calc(var(--z-sticky) + 2)',
            padding: '16px',
            borderBottom: '1px solid rgba(212, 197, 185, 0.12)',
            animation: 'fadeInDown 0.25s ease',
          }}>
            {[
              { label: 'Menu', to: '/' },
              { label: 'Track Order', to: '/tracking' },
              { label: 'My Account', to: '/account' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 8px',
                  color: 'var(--color-cream)',
                  fontWeight: 600,
                  fontSize: '15px',
                  borderBottom: '1px solid rgba(212, 197, 185, 0.08)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-cream)'}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .header-search-desktop { display: none !important; }
          .header-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .header-search-desktop { display: flex !important; }
          .header-hamburger { display: none !important; }
          .header-mobile-search { display: none !important; }
        }
      `}</style>
    </>
  )
}
