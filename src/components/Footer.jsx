import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0F1419',
        borderTop: '1px solid rgba(212, 197, 185, 0.12)',
        paddingTop: '64px',
        paddingBottom: '32px',
        color: 'var(--color-cream)',
      }}
      aria-label="Footer"
    >
      <div className="container">
        {/* Main 3-column layout matching website */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr 1fr',
            gap: '48px',
            alignItems: 'start',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand & Nav Links */}
          <div>
            {/* Logo Badge */}
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: '2px solid var(--color-gold)',
                background: '#1A222A',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '6px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              }}>
                <span style={{ fontSize: '24px', lineHeight: 1 }}>🐷</span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '9px', fontWeight: 900, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px', lineHeight: 1.1 }}>
                  KENNY'S<br />PORK ROLLS
                </span>
                <span style={{ fontSize: '7px', color: 'var(--color-sage)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  ASIAN STREET FOOD
                </span>
              </div>
            </Link>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Link
                to="/"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#CC1A1A',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.target.style.color = '#CC1A1A'}
              >
                ABOUT
              </Link>
              <Link
                to="/"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#CC1A1A',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.target.style.color = '#CC1A1A'}
              >
                MENU
              </Link>
              <a
                href="#contact"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#CC1A1A',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.target.style.color = '#CC1A1A'}
              >
                CONTACT
              </a>
            </nav>
          </div>

          {/* Column 2: Location & Hours */}
          <div style={{ textAlign: 'center' }} id="contact">
            <h3 style={{
              fontFamily: "'Bebas Neue', Outfit, sans-serif",
              fontSize: '28px',
              fontWeight: 900,
              color: 'var(--color-cream)',
              letterSpacing: '0.05em',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}>
              FIND US IN THE HEART OF DARLINGHURST
            </h3>

            {/* Address */}
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--color-gold)',
              lineHeight: 1.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              159 OXFORD ST<br />
              DARLINGHURST<br />
              NSW 2010
            </p>

            {/* Hours */}
            <div style={{
              fontSize: '13px',
              color: 'var(--color-sage)',
              lineHeight: 1.8,
              fontWeight: 600,
              marginBottom: '20px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              <div>MON - THU: 11 AM – 5 PM</div>
              <div>FRI: 11 AM – 3 AM</div>
              <div>SAT: 11 AM – 3 AM</div>
              <div style={{ color: '#CC1A1A' }}>SUN: CLOSED</div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '12px' }}>
              <a
                href="tel:0280408004"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '17px',
                  color: '#CC1A1A',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.target.style.color = '#CC1A1A'}
              >
                (02) 8040 8004
              </a>
            </div>

            {/* Directions link */}
            <div>
              <a
                href="https://maps.google.com/?q=159+Oxford+St+Darlinghurst+NSW+2010"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#CC1A1A',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #CC1A1A',
                  paddingBottom: '2px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.target.style.color = 'var(--color-gold)'
                  e.target.style.borderColor = 'var(--color-gold)'
                }}
                onMouseLeave={e => {
                  e.target.style.color = '#CC1A1A'
                  e.target.style.borderColor = '#CC1A1A'
                }}
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>

          {/* Column 3: Order Online CTAs */}
          <div style={{ textAlign: 'right' }}>
            <h3 style={{
              fontFamily: "'Bebas Neue', Outfit, sans-serif",
              fontSize: '28px',
              fontWeight: 900,
              color: 'var(--color-cream)',
              letterSpacing: '0.05em',
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}>
              ORDER ONLINE
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-end' }}>
              {/* Uber Eats */}
              <a
                href="https://www.ubereats.com/au/store/kennys-pork-rolls/DgWmWqx1RcSOa2WLjReC3w?diningMode=DELIVERY"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: '220px',
                  padding: '14px 20px',
                  border: '1.5px solid #CC1A1A',
                  borderRadius: 'var(--radius-sm)',
                  color: '#CC1A1A',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#CC1A1A'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#CC1A1A'
                }}
              >
                UBER EATS
              </a>

              {/* Catering */}
              <Link
                to="/"
                onClick={() => {
                  const el = document.getElementById('menu-section')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: '220px',
                  padding: '14px 20px',
                  border: '1.5px solid #CC1A1A',
                  borderRadius: 'var(--radius-sm)',
                  color: '#CC1A1A',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#CC1A1A'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#CC1A1A'
                }}
              >
                CATERING
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom divider & Copyright */}
        <div style={{ height: '1px', background: 'rgba(212, 197, 185, 0.1)', marginBottom: '24px' }} />

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '12px',
            color: 'var(--color-sage)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            COPYRIGHT © 2021-2024 KENNY'S PORK ROLLS
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .footer-grid > div {
            text-align: center !important;
            align-items: center !important;
          }
          .footer-grid nav,
          .footer-grid div:last-child div {
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
