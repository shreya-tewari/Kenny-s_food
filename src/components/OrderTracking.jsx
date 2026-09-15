import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Loader, Package, Bike, Home, Phone, MessageSquare } from 'lucide-react'

const TRACKING_STEPS = [
  {
    id: 'confirmed',
    icon: CheckCircle,
    label: 'Order Confirmed',
    time: '2:15 PM',
    status: 'completed',
    detail: 'Your order has been received and confirmed.',
  },
  {
    id: 'preparing',
    icon: Package,
    label: 'Preparing Your Order',
    time: '~12 mins',
    status: 'current',
    detail: 'Kenny\'s kitchen is working on your crispy pork rolls right now!',
  },
  {
    id: 'ready',
    icon: Bike,
    label: 'Out for Delivery',
    time: 'Est. 2:45 PM',
    status: 'upcoming',
    detail: 'Your order will be picked up by a driver shortly.',
  },
  {
    id: 'delivered',
    icon: Home,
    label: 'Delivered',
    time: 'Est. 3:00 PM',
    status: 'upcoming',
    detail: 'Enjoy your meal!',
  },
]

function TrackingStep({ step, isLast }) {
  const statusColor = {
    completed: 'var(--color-success)',
    current: 'var(--color-gold)',
    upcoming: 'var(--color-taupe)',
  }

  const Icon = step.icon

  return (
    <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
      {/* Timeline line */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '44px',
          bottom: '-16px',
          width: '2px',
          background: step.status === 'completed'
            ? 'linear-gradient(var(--color-success), var(--color-taupe))'
            : 'var(--color-taupe)',
          zIndex: 0,
        }} />
      )}

      {/* Step dot */}
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: step.status === 'upcoming' ? 'var(--color-cream-dark)' : statusColor[step.status],
        border: `2px solid ${statusColor[step.status]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        zIndex: 1,
        position: 'relative',
        boxShadow: step.status === 'current' ? '0 0 0 4px rgba(201, 169, 97, 0.2)' : 'none',
        animation: step.status === 'current' ? 'pulseGold 2s infinite' : 'none',
      }}>
        <Icon
          size={18}
          color={step.status === 'upcoming' ? 'var(--color-sage)' : 'white'}
          style={{ animation: step.status === 'current' ? 'none' : 'none' }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{
            fontWeight: 700,
            fontSize: '15px',
            color: step.status === 'upcoming' ? 'var(--color-sage)' : 'var(--color-charcoal)',
          }}>
            {step.label}
          </span>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: step.status === 'completed' ? 'var(--color-success)' :
              step.status === 'current' ? 'var(--color-gold)' : 'var(--color-sage)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            {step.status === 'current' && (
              <Loader size={12} style={{ animation: 'spinLoader 1s linear infinite' }} />
            )}
            {step.time}
          </span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--color-sage)', lineHeight: 1.5 }}>
          {step.detail}
        </p>
      </div>
    </div>
  )
}

export default function OrderTracking() {
  const [currentStepIdx, setCurrentStepIdx] = useState(1) // 'preparing'
  const [elapsed, setElapsed] = useState(0)

  // Simulate progress (demo only)
  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <main id="main-content" style={{ background: 'var(--color-cream)', minHeight: '100vh', paddingTop: '72px' }}>
      <div className="container" style={{ maxWidth: '680px', paddingTop: '48px', paddingBottom: '80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <span className="badge badge-success" style={{ marginBottom: '12px' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-cream)', marginRight: '6px', animation: 'blink 1.2s infinite' }} />
            Live Tracking
          </span>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '32px', color: 'var(--color-charcoal)', marginBottom: '4px' }}>
            Track Your Order
          </h1>
          <p style={{ color: 'var(--color-sage)', fontSize: '15px' }}>
            Order{' '}
            <span className="mono" style={{ color: 'var(--color-charcoal)', fontWeight: 700 }}>
              KP-241205
            </span>
          </p>
        </div>

        {/* ETA bar */}
        <div style={{
          background: 'var(--gradient-cta)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)', opacity: 0.8, marginBottom: '4px' }}>
              Estimated Arrival
            </div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '32px', color: 'var(--color-charcoal)' }}>
              ~22 min
            </div>
          </div>
          <div style={{
            background: 'rgba(15, 20, 25, 0.15)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '12px', color: 'var(--color-charcoal)', fontWeight: 600, opacity: 0.8 }}>Arriving by</div>
            <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--color-charcoal)' }}>3:00 PM</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-body" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, marginBottom: '24px', fontSize: '16px' }}>
              Order Status
            </h3>
            {TRACKING_STEPS.map((step, idx) => (
              <TrackingStep key={step.id} step={step} isLast={idx === TRACKING_STEPS.length - 1} />
            ))}
          </div>
        </div>

        {/* Driver info */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-body">
            <h4 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '14px', color: 'var(--color-charcoal)' }}>
              Your Driver
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '18px' }}>M</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-charcoal)' }}>Marcus T.</div>
                <div style={{ fontSize: '13px', color: 'var(--color-sage)' }}>⭐ 4.9 · Honda Scooter · MOP-123</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href="tel:0400000000"
                  className="btn-icon"
                  aria-label="Call driver"
                  style={{
                    background: 'var(--color-success-light)',
                    borderRadius: '50%',
                    color: 'var(--color-success)',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Phone size={16} />
                </a>
                <button
                  className="btn-icon"
                  aria-label="Message driver"
                  style={{
                    background: 'var(--color-gold-pale)',
                    borderRadius: '50%',
                    color: 'var(--color-gold)',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <Link to="/" className="btn btn-secondary btn-full">
          ← Back to Menu
        </Link>
      </div>
    </main>
  )
}
