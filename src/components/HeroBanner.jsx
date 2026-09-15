import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, Instagram, Facebook } from 'lucide-react'

/* ── Data ─────────────────────────────────────────────────────────────── */

const FLOATERS = [
  { emoji: '🌶️', x: 63, y: 10, size: 52, rot: -28, dur: 5.5, delay: 0    },
  { emoji: '🌶️', x: 82, y: 60, size: 40, rot:  22, dur: 6.2, delay: 1.4  },
  { emoji: '🌶️', x: 70, y: 78, size: 34, rot:  14, dur: 7.0, delay: 2.6  },
  { emoji: '🌿', x: 57, y:  8, size: 46, rot: -14, dur: 5.8, delay: 0.7  },
  { emoji: '🌿', x: 90, y: 68, size: 36, rot:  38, dur: 6.8, delay: 2.1  },
  { emoji: '🌿', x: 62, y: 85, size: 28, rot: -52, dur: 5.2, delay: 1.9  },
]

const BOTTOM_STATS = [
  { label: 'SLOW ROASTED', sub: 'For maximum flavour' },
  { label: '100% AUSSIE PORK', sub: 'Ethically sourced' },
  { label: 'NO NASTIES', sub: 'Just real ingredients' },
  { label: 'MADE FRESH DAILY', sub: 'In select locations' },
]

const STEAM = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left: 42 + i * 4 + (i % 2 ? -5 : 3),
  bottom: 38 + (i % 3) * 4,
  size: 22 + i * 5,
  delay: i * 0.35,
  dur: 2.8 + i * 0.25,
}))

/* ── Main Component ───────────────────────────────────────────────────── */
export default function HeroBanner() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const enter = (delay) => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        background: '#050505',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Main grid ── */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        minHeight: 'calc(100vh - 76px)',
        paddingBottom: '76px', /* room for bottom strip */
      }}>

        {/* ── LEFT — copy ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(20px,5vw,80px) clamp(24px,4vw,52px) 40px clamp(24px,5vw,64px)',
          position: 'relative',
          zIndex: 10,
        }}>

          {/* Eyebrow */}
          <div style={{ ...enter(0.05), display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            <span style={{
              width: '28px', height: '2px',
              background: '#CC1A1A', display: 'block', flexShrink: 0,
            }} />
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em',
              color: '#CC1A1A', textTransform: 'uppercase',
            }}>
              Sydney's #1 Street Food
            </span>
          </div>

          {/* Headline — neon */}
          <h1 style={{
            ...enter(0.15),
            fontFamily: "'Bebas Neue', 'Outfit', sans-serif",
            fontSize: 'clamp(64px, 9vw, 118px)',
            lineHeight: 0.91,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            marginBottom: '26px',
          }}>
            <span style={{
              display: 'block',
              color: '#E84820',
              animation: mounted ? 'neonFlicker 8s ease-in-out 1.5s infinite' : 'none',
              textShadow: '0 0 25px rgba(232,72,32,0.7), 0 0 55px rgba(232,72,32,0.35), 0 0 100px rgba(232,72,32,0.15)',
            }}>THE</span>
            <span style={{
              display: 'block',
              color: '#E84820',
              animation: mounted ? 'neonFlicker 8s ease-in-out 3s infinite' : 'none',
              textShadow: '0 0 25px rgba(232,72,32,0.7), 0 0 55px rgba(232,72,32,0.35), 0 0 100px rgba(232,72,32,0.15)',
            }}>CRUNCH</span>
            <span style={{
              display: 'block',
              color: '#FFFFFF',
              textShadow: '0 0 18px rgba(255,255,255,0.08)',
            }}>YOU CRAVE</span>
          </h1>

          {/* Sub */}
          <p style={{
            ...enter(0.28),
            fontSize: '15px',
            color: 'rgba(212,197,185,0.72)',
            lineHeight: 1.7,
            maxWidth: '330px',
            marginBottom: '34px',
          }}>
            Golden crackling. Tender pork. Bold flavour.<br />
            Kenny's Pork Rolls are a street food obsession.
          </p>

          {/* CTAs */}
          <div style={{ ...enter(0.38), display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
              id="hero-order-now"
              onClick={scrollToMenu}
              style={{
                display: 'flex', alignItems: 'center', gap: '9px',
                padding: '15px 30px',
                background: '#CC1A1A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px', fontWeight: 800,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(204,26,26,0.45), 0 1px 0 rgba(255,255,255,0.1) inset',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#E82020'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(204,26,26,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#CC1A1A'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(204,26,26,0.45)'
              }}
            >
              ORDER NOW <ArrowRight size={15} />
            </button>

            <button
              id="hero-view-menu"
              onClick={scrollToMenu}
              style={{
                padding: '15px 30px',
                background: 'transparent',
                color: '#FFFFFF',
                border: '2px solid rgba(255,255,255,0.32)',
                borderRadius: '4px',
                fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              VIEW MENU
            </button>
          </div>

          {/* Social proof */}
          <div style={{ ...enter(0.48), display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Stacked avatars */}
            <div style={{ display: 'flex' }}>
              {['#C9503A','#5C8A6F','#7BA8C4','#C9A961'].map((bg, i) => (
                <div key={i} style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  border: '2px solid #050505',
                  background: bg,
                  marginLeft: i > 0 ? '-9px' : 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700, color: '#fff',
                  zIndex: 4 - i,
                  position: 'relative',
                }}>
                  {['A','J','M','L'][i]}
                </div>
              ))}
            </div>
            {/* Stars */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ color: '#E84820', fontSize: '18px' }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: '13px', color: 'rgba(245,241,232,0.65)' }}>
              <strong style={{ color: '#fff' }}>4.9</strong>
              <span style={{ marginLeft: '4px' }}>(2,300+ reviews)</span>
            </span>
          </div>
        </div>

        {/* ── RIGHT — 3D cutting scene ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>

          {/* Perspective wrapper for 3D tilt */}
          <div style={{
            position: 'absolute', inset: 0,
            perspective: '1100px',
            perspectiveOrigin: '50% 45%',
          }}>
            {/* Scene tilted in 3D */}
            <div style={{
              position: 'absolute', inset: 0,
              animation: 'heroSceneBreath 8s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}>
              {/* Hero photo */}
              <img
                src="/hero-pork.jpg"
                alt="Crispy pork belly being cut on a dark wooden board"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: '55% 50%',
                  display: 'block',
                }}
              />

              {/* Steam particles */}
              {STEAM.map(p => (
                <div key={p.id} style={{
                  position: 'absolute',
                  left: p.left + '%',
                  bottom: p.bottom + '%',
                  width: p.size + 'px',
                  height: p.size + 'px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(7px)',
                  animation: `steamRise ${p.dur}s ease-out ${p.delay}s infinite`,
                  pointerEvents: 'none',
                  zIndex: 5,
                }} />
              ))}
            </div>
          </div>

          {/* Floating food elements */}
          {FLOATERS.map((f, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: f.x + '%', top: f.y + '%',
              fontSize: f.size + 'px',
              '--rot': f.rot + 'deg',
              animation: `floatElement ${f.dur}s ease-in-out ${f.delay}s infinite`,
              pointerEvents: 'none',
              zIndex: 20,
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.6))',
              willChange: 'transform',
            }}>
              {f.emoji}
            </div>
          ))}

          {/* "100% AUSSIE PORK" circular badge */}
          <div style={{
            position: 'absolute',
            right: '7%', top: '26%',
            width: '112px', height: '112px',
            borderRadius: '50%',
            background: 'rgba(8,8,8,0.72)',
            backdropFilter: 'blur(8px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '12px',
            zIndex: 25,
            animation: 'badgePulse 3s ease-in-out infinite',
          }}>
            <div style={{ fontSize: '8px', letterSpacing: '0.18em', color: 'rgba(245,241,232,0.55)', textTransform: 'uppercase', marginBottom: '3px' }}>
              REAL INGREDIENTS
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', fontWeight: 900, color: '#FFFFFF', lineHeight: 0.9, letterSpacing: '0.04em' }}>
              100%
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', fontWeight: 900, color: '#CC1A1A', lineHeight: 0.95, letterSpacing: '0.06em' }}>
              AUSSIE
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px', fontWeight: 900, color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '0.05em', marginBottom: '3px' }}>
              PORK
            </div>
            <div style={{ fontSize: '7px', letterSpacing: '0.14em', color: 'rgba(245,241,232,0.5)', textTransform: 'uppercase' }}>
              BOLD FLAVOUR
            </div>
            {/* Border ring */}
            <div style={{
              position: 'absolute', inset: '4px',
              border: '1px solid rgba(245,241,232,0.3)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Left-side gradient blend */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.25) 28%, rgba(5,5,5,0) 55%)',
            pointerEvents: 'none',
            zIndex: 15,
          }} />

          {/* Bottom gradient blend */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
            background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 15,
          }} />
        </div>
      </div>

      {/* ── Bottom stats strip ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '76px',
        background: 'rgba(6,6,6,0.96)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(16px,4vw,64px)',
        zIndex: 50,
      }}>
        {/* Stat items */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {BOTTOM_STATS.map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 clamp(8px,2vw,24px)',
              borderRight: i < BOTTOM_STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.38)', marginTop: '2px', whiteSpace: 'nowrap' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Follow Us */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          paddingLeft: 'clamp(12px,2vw,28px)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            FOLLOW US
          </span>
          {[Instagram, Facebook].map((Icon, i) => (
            <a key={i} href="#" aria-label={['Instagram','Facebook'][i]} style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.55)',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(204,26,26,0.7)'
              e.currentTarget.style.color = '#CC1A1A'
              e.currentTarget.style.background = 'rgba(204,26,26,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
              e.currentTarget.style.background = 'transparent'
            }}>
              <Icon size={14} />
            </a>
          ))}
          {/* TikTok (no Lucide icon, use text) */}
          <a href="#" aria-label="TikTok" style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.55)',
            fontSize: '13px',
            transition: 'all 0.2s',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(204,26,26,0.7)'
            e.currentTarget.style.color = '#CC1A1A'
            e.currentTarget.style.background = 'rgba(204,26,26,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
            e.currentTarget.style.background = 'transparent'
          }}>
            ♪
          </a>
        </div>
      </div>

      {/* Scroll chevron */}
      <div style={{
        position: 'absolute',
        bottom: '92px', left: '50%',
        zIndex: 60,
        animation: 'scrollChevron 2s ease-in-out infinite',
        pointerEvents: 'none',
      }}>
        <ChevronDown size={22} color="rgba(204,26,26,0.8)" />
      </div>

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 900px) {
          #hero > div:first-child { grid-template-columns: 1fr !important; }
          #hero > div:first-child > div:last-child { min-height: 55vw; }
        }
        @media (max-width: 640px) {
          #hero > div:first-child > div:first-child { padding: 80px 24px 32px !important; }
        }
      `}</style>
    </section>
  )
}
