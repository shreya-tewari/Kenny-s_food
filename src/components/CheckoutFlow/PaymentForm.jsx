import React, { useState } from 'react'
import { CreditCard, Shield, Tag, CheckCircle } from 'lucide-react'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'cash', label: 'Pay with Cash (In-Store / On Delivery)', icon: '💵' },
]

export default function PaymentForm({ data, onChange, onNext, onBack, cart }) {
  const [method, setMethod] = useState(data.method || 'card')
  const [card, setCard] = useState({
    name: data.cardName || '',
    number: data.cardNumber || '',
    expiry: data.expiry || '',
    cvv: data.cvv || '',
  })
  const [billingSame, setBillingSame] = useState(true)
  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState(data.promo || null)
  const [promoError, setPromoError] = useState('')
  const [errors, setErrors] = useState({})

  const updateCard = (field, value) => {
    let v = value
    if (field === 'number') v = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
    if (field === 'expiry') v = value.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5)
    if (field === 'cvv') v = value.replace(/\D/g, '').slice(0, 4)
    setCard(c => ({ ...c, [field]: v }))
  }

  const handleApplyPromo = () => {
    const VALID = { KENNY10: 10, FIRSTORDER: 15, PORKROLL5: 5 }
    const code = promoInput.trim().toUpperCase()
    if (VALID[code]) {
      setPromoApplied({ code, pct: VALID[code] })
      setPromoError('')
    } else {
      setPromoError('Invalid code. Try KENNY10 or FIRSTORDER.')
      setPromoApplied(null)
    }
  }

  const validate = () => {
    if (method !== 'card') return true
    const e = {}
    if (!card.name.trim()) e.name = 'Name is required'
    if (card.number.replace(/\s/g, '').length < 16) e.number = 'Enter a valid 16-digit card number'
    if (card.expiry.length < 5) e.expiry = 'Enter expiry MM/YY'
    if (card.cvv.length < 3) e.cvv = 'Enter 3-4 digit CVV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (!validate()) return
    onChange({ method, ...card, promo: promoApplied, billingSame })
    onNext()
  }

  return (
    <div className="page-enter">
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '24px', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
        Payment
      </h2>
      <p style={{ color: 'var(--color-sage)', fontSize: '14px', marginBottom: '28px' }}>
        Your payment information is encrypted and secure.
      </p>

      {/* Payment method selection */}
      <div style={{ marginBottom: '24px' }}>
        <label className="form-label" style={{ display: 'block', marginBottom: '12px' }}>Payment Method</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {PAYMENT_METHODS.map(pm => (
            <button
              key={pm.id}
              onClick={() => setMethod(pm.id)}
              style={{
                padding: '14px 16px',
                border: `${method === pm.id ? '2px' : '1px'} solid ${method === pm.id ? 'var(--color-gold)' : 'var(--color-taupe)'}`,
                borderRadius: 'var(--radius-md)',
                background: method === pm.id ? 'var(--color-gold-pale)' : 'var(--color-cream)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s',
                textAlign: 'left',
              }}
              aria-pressed={method === pm.id}
              id={`payment-method-${pm.id}`}
            >
              <span style={{ fontSize: '20px' }}>{pm.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>{pm.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cash option info */}
      {method === 'cash' && (
        <div className="anim-fade-in" style={{
          background: 'white',
          border: '1px solid var(--color-taupe)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '28px' }}>💵</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-charcoal)' }}>
              Pay in Person
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-sage)', marginTop: '2px' }}>
              You can pay with cash or card terminal upon pickup or delivery arrival.
            </div>
          </div>
        </div>
      )}

      {/* Card details */}
      {method === 'card' && (
        <div className="anim-fade-in" style={{
          background: 'white',
          border: '1px solid var(--color-taupe)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <CreditCard size={16} color="var(--color-gold)" />
            <span style={{ fontWeight: 700, fontSize: '14px' }}>Card Details</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="card-name">Cardholder Name</label>
            <input
              id="card-name"
              type="text"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="As it appears on your card"
              value={card.name}
              onChange={e => updateCard('name', e.target.value)}
              autoComplete="cc-name"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="card-number">Card Number</label>
            <input
              id="card-number"
              type="text"
              inputMode="numeric"
              className={`form-input ${errors.number ? 'error' : ''}`}
              placeholder="1234 5678 9012 3456"
              value={card.number}
              onChange={e => updateCard('number', e.target.value)}
              autoComplete="cc-number"
              maxLength={19}
            />
            {errors.number && <span className="form-error">{errors.number}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="card-expiry">Expiry Date</label>
              <input
                id="card-expiry"
                type="text"
                inputMode="numeric"
                className={`form-input ${errors.expiry ? 'error' : ''}`}
                placeholder="MM/YY"
                value={card.expiry}
                onChange={e => updateCard('expiry', e.target.value)}
                autoComplete="cc-exp"
                maxLength={5}
              />
              {errors.expiry && <span className="form-error">{errors.expiry}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="card-cvv">CVV</label>
              <input
                id="card-cvv"
                type="text"
                inputMode="numeric"
                className={`form-input ${errors.cvv ? 'error' : ''}`}
                placeholder="123"
                value={card.cvv}
                onChange={e => updateCard('cvv', e.target.value)}
                autoComplete="cc-csc"
                maxLength={4}
              />
              {errors.cvv && <span className="form-error">{errors.cvv}</span>}
            </div>
          </div>

          <label className="form-check">
            <input
              type="checkbox"
              checked={billingSame}
              onChange={e => setBillingSame(e.target.checked)}
              aria-label="Billing address same as delivery"
            />
            <span className="form-check-label" style={{ fontSize: '13px' }}>
              Billing address is the same as delivery address
            </span>
          </label>
        </div>
      )}

      {/* Promo code */}
      <div style={{
        background: 'var(--color-gold-pale)',
        border: '1px solid rgba(201, 169, 97, 0.2)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Tag size={14} color="var(--color-gold)" />
          <span style={{ fontWeight: 700, fontSize: '14px' }}>Promo Code</span>
        </div>
        {promoApplied ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} color="var(--color-success)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
              {promoApplied.code} — {promoApplied.pct}% off applied!
            </span>
            <button className="btn-ghost btn-sm" onClick={() => setPromoApplied(null)} style={{ marginLeft: 'auto', fontSize: '12px' }}>
              Remove
            </button>
          </div>
        ) : (
          <>
            <div className="promo-row">
              <input
                type="text"
                className="form-input"
                placeholder="Enter promo code"
                value={promoInput}
                onChange={e => { setPromoInput(e.target.value); setPromoError('') }}
                onKeyDown={e => e.key === 'Enter' && handleApplyPromo()}
                aria-label="Promo code input"
                style={{ padding: '10px 14px' }}
              />
              <button className="btn btn-secondary btn-sm" onClick={handleApplyPromo} style={{ whiteSpace: 'nowrap' }}>
                Apply
              </button>
            </div>
            {promoError && <p style={{ fontSize: '12px', color: 'var(--color-error)', marginTop: '6px' }}>{promoError}</p>}
          </>
        )}
      </div>

      {/* Security badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        background: 'var(--color-success-light)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '24px',
        fontSize: '13px',
        color: 'var(--color-success)',
        fontWeight: 600,
      }}>
        <Shield size={14} />
        256-bit SSL encryption · Your data is never stored
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-secondary" onClick={onBack} id="payment-back">← Back</button>
        <button className="btn btn-primary btn-lg" onClick={handleNext} id="payment-next" style={{ flex: 1 }}>
          Review Order
        </button>
      </div>
    </div>
  )
}
