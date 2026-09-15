import React, { useState } from 'react'
import { Truck, Store, Clock } from 'lucide-react'

const TIME_SLOTS = [
  '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
]

export default function DeliveryPickup({ data, onChange, onNext }) {
  const [type, setType] = useState(data.type || 'delivery')
  const [pickupSlot, setPickupSlot] = useState(data.pickupSlot || '12:00 PM')

  const selectType = (newType) => {
    setType(newType)
    onChange({ type: newType, pickupSlot: newType === 'pickup' ? (pickupSlot || '12:00 PM') : null })
  }

  const selectSlot = (slot) => {
    setPickupSlot(slot)
    onChange({ type, pickupSlot: slot })
  }

  const handleNext = () => {
    onChange({ type, pickupSlot: type === 'pickup' ? (pickupSlot || '12:00 PM') : null })
    onNext()
  }

  const valid = type === 'delivery' || (type === 'pickup' && (pickupSlot || '12:00 PM'))

  return (
    <div className="page-enter">
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '24px', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
        How would you like your order?
      </h2>
      <p style={{ color: 'var(--color-sage)', fontSize: '14px', marginBottom: '32px' }}>
        Choose delivery to your door or pickup at our store.
      </p>

      {/* Toggle cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
        {/* Delivery */}
        <div
          className={`delivery-card ${type === 'delivery' ? 'selected' : ''}`}
          onClick={() => selectType('delivery')}
          role="radio"
          aria-checked={type === 'delivery'}
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && selectType('delivery')}
          id="select-delivery"
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: type === 'delivery' ? 'var(--color-gold)' : 'var(--color-cream-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}>
            <Truck size={22} color={type === 'delivery' ? 'var(--color-charcoal)' : 'var(--color-sage)'} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-charcoal)', marginBottom: '4px' }}>
              Delivery
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-sage)', lineHeight: 1.4 }}>
              Hot to your door<br />
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Est. 25–35 min</span>
            </div>
          </div>
        </div>

        {/* Pickup */}
        <div
          className={`delivery-card ${type === 'pickup' ? 'selected' : ''}`}
          onClick={() => selectType('pickup')}
          role="radio"
          aria-checked={type === 'pickup'}
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && selectType('pickup')}
          id="select-pickup"
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: type === 'pickup' ? 'var(--color-gold)' : 'var(--color-cream-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}>
            <Store size={22} color={type === 'pickup' ? 'var(--color-charcoal)' : 'var(--color-sage)'} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-charcoal)', marginBottom: '4px' }}>
              Pickup
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-sage)', lineHeight: 1.4 }}>
              Skip the wait<br />
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Ready in 15 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pickup time slots */}
      {type === 'pickup' && (
        <div className="anim-fade-in" style={{ marginBottom: '28px' }}>
          <div style={{
            background: 'var(--color-cream)',
            border: '1px solid var(--color-taupe)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Clock size={16} color="var(--color-gold)" />
              <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-charcoal)' }}>
                Select a pickup time
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => selectSlot(slot)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${pickupSlot === slot ? 'var(--color-gold)' : 'var(--color-taupe)'}`,
                    background: pickupSlot === slot ? 'var(--color-gold)' : 'transparent',
                    color: pickupSlot === slot ? 'var(--color-charcoal)' : 'var(--color-charcoal)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  aria-pressed={pickupSlot === slot}
                >
                  {slot}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '14px', padding: '10px 12px', background: 'var(--color-success-light)', borderRadius: 'var(--radius-md)', fontSize: '13px', color: 'var(--color-success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              📍 42 George Street, Sydney NSW 2000
            </div>
          </div>
        </div>
      )}

      {/* Delivery info panel */}
      {type === 'delivery' && (
        <div className="anim-fade-in" style={{ marginBottom: '28px' }}>
          <div style={{
            background: 'var(--color-success-light)',
            border: '1px solid rgba(92, 138, 111, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}>
            <Truck size={20} color="var(--color-success)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-charcoal)' }}>
                Delivery available in your area
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-success)' }}>
                Estimated delivery: 25–35 min · $4.99 flat fee
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="btn btn-primary btn-lg"
        onClick={handleNext}
        disabled={!valid}
        id="checkout-delivery-next"
        style={{ minWidth: '200px' }}
      >
        Continue
      </button>
    </div>
  )
}
