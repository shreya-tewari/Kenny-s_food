import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Menu', to: '/' },
    { label: 'Catering Enquiries', to: '/' },
    { label: 'Gift Cards', to: '/' },
    { label: 'FAQs', to: '/' },
  ],
  'Support': [
    { label: 'Help Centre', to: '/' },
    { label: 'Track Your Order', to: '/tracking' },
    { label: 'Report an Issue', to: '/' },
    { label: 'Contact Us', to: '/' },
  ],
}

const SOCIAL = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--color-charcoal)',
        borderTop: '1px solid rgba(212, 197, 185, 0.1)',
        paddingTop: '64px',
        paddingBottom: '32px',
      }}
      aria-label="Footer"
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '48px',
          marginBottom: '48px',
        }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: '24px',
                  color: 'var(--color-cream)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>
                  Kenny's <span style={{ color: 'var(--color-gold)' }}>Pork Rolls</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-sage)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                  Filling Buns & Hearts
                </div>
              </div>
            </Link>
            <p style={{ fontSize: '14px', color: 'var(--color-sage)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '20px' }}>
              Serving Sydney's freshest and crispiest pork rolls since 2012. Community-first, quality-always.
            </p>
            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: MapPin, text: '42 George Street, Sydney NSW 2000' },
                { icon: Phone, text: '(02) 9000 0000' },
                { icon: Mail, text: 'hello@kennyporkrolls.com.au' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Icon size={14} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13px', color: 'var(--color-sage)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}>
                {heading}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      style={{ fontSize: '14px', color: 'var(--color-cream)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                      onMouseLeave={e => e.target.style.color = 'var(--color-cream)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}>
              Stay in the loop
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-sage)', marginBottom: '14px', lineHeight: 1.6 }}>
              Get weekly specials, new menu drops and exclusive offers straight to your inbox.
            </p>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Newsletter email"
                className="form-input"
                style={{ background: 'rgba(245, 241, 232, 0.08)', borderColor: 'rgba(212, 197, 185, 0.2)', color: 'var(--color-cream)' }}
              />
              <button className="btn btn-primary btn-full" type="submit">
                Subscribe
              </button>
            </form>

            {/* Social */}
            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-sage)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: '1px solid rgba(212, 197, 185, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-sage)',
                      transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--color-gold)'
                      e.currentTarget.style.borderColor = 'var(--color-gold)'
                      e.currentTarget.style.background = 'rgba(201, 169, 97, 0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--color-sage)'
                      e.currentTarget.style.borderColor = 'rgba(212, 197, 185, 0.2)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(212, 197, 185, 0.1)', marginBottom: '24px' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: 'var(--color-sage)' }}>
            © {year} Kenny's Pork Rolls Pty Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(label => (
              <a
                key={label}
                href="#"
                style={{ fontSize: '13px', color: 'var(--color-sage)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-sage)'}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
