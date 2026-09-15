import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, MapPin, Clock, Phone, RotateCcw, Navigation } from 'lucide-react'

function Confetti() {
  const pieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: ['#C9A961', '#8B4513', '#5C8A6F', '#F5F1E8', '#D4A574'][i % 5],
    left: `${Math.random() * 90 + 5}%`,
    delay: `${Math.random() * 0.8}s`,
    duration: `${0.8 + Math.random() * 0.6}s`,
    size: `${6 + Math.random() * 6}px`,
    rotate: `${Math.random() * 360}deg`,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: '20%',
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate})`,
          }}
        />
      ))}
    </div>
  )
}

export default function OrderConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [checkVisible, setCheckVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setCheckVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  const orderId = state?.orderId || 'KP-' + Date.now().toString().slice(-6)
  const isPickup = state?.type === 'pickup'
  const etaMinutes = isPickup ? 15 : 30

  return (
    <main id="main-content" style={{ background: 'var(--color-cream)', minHeight: '100vh', paddingTop: '72px' }}>
      <div className="container" style={{ maxWidth: '680px', paddingTop: '60px', paddingBottom: '80px' }}>

        {/* Success hero */}
        <div style={{
          background: 'var(--color-success-light)',
          border: '1px solid rgba(92, 138, 111, 0.2)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 32px',
          textAlign: 'center',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {checkVisible && <Confetti />}

          {/* Animated checkmark */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'var(--color-success)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            animation: checkVisible ? 'bounceIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            position: 'relative',
            zIndex: 1,
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M10 20 L17 27 L30 13"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-svg"
                style={{
                  strokeDasharray: 80,
                  strokeDashoffset: checkVisible ? 0 : 80,
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
                }}
              />
            </svg>
          </div>

          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 900,
            fontSize: '32px',
            color: 'var(--color-charcoal)',
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1,
          }}>
            Order Confirmed! 🎉
          </h1>
          <p style={{ color: 'var(--color-sage)', fontSize: '16px', position: 'relative', zIndex: 1 }}>
            {isPickup
              ? 'Your order is being prepared. We\'ll have it ready for you soon!'
              : 'We\'ve received your order and it\'s being prepared right now.'}
          </p>

          {/* Order ID */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            border: '1px solid var(--color-taupe)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 20px',
            marginTop: '20px',
            position: 'relative',
            zIndex: 1,
          }}>
            <span style={{ fontSize: '13px', color: 'var(--color-sage)', fontWeight: 600 }}>Order #</span>
            <span className="mono" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-charcoal)', letterSpacing: '0.1em' }}>
              {orderId}
            </span>
          </div>
        </div>

        {/* ETA card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '28px',
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="card-body">
              <Clock size={28} color="var(--color-gold)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 800, fontSize: '28px', color: 'var(--color-charcoal)', fontFamily: 'Outfit' }}>
                {etaMinutes} min
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-sage)' }}>
                {isPickup ? 'Pickup ready' : 'Estimated delivery'}
              </div>
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="card-body">
              <MapPin size={28} color="var(--color-gold)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-charcoal)' }}>
                {isPickup ? '42 George St, Sydney' : (state?.address?.street || 'Your address')}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-sage)' }}>
                {isPickup ? 'Pickup location' : 'Delivery address'}
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        {state?.items && (
          <div className="card" style={{ marginBottom: '28px' }}>
            <div className="card-body">
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, marginBottom: '16px' }}>Order Summary</h3>
              {state.items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--color-taupe)',
                  fontSize: '14px',
                }}>
                  <span>{item.qty}× {item.name}</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-gold)' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontWeight: 800, fontSize: '18px', color: 'var(--color-gold)' }}>
                <span style={{ color: 'var(--color-charcoal)' }}>Total</span>
                ${state.total?.toFixed(2) || '—'}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/tracking" className="btn btn-primary btn-lg btn-full">
            <Navigation size={18} />
            Track My Order
          </Link>
          <Link to="/" className="btn btn-secondary btn-full">
            <RotateCcw size={16} />
            Order Again
          </Link>
          <div style={{ textAlign: 'center', paddingTop: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-sage)' }}>
              Questions? {' '}
              <a href="tel:0290000000" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
                Call us on (02) 9000 0000
              </a>
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
