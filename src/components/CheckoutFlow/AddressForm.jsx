import React, { useState } from 'react'
import { MapPin, Plus, Clock } from 'lucide-react'
import { SAVED_ADDRESSES } from '../../data/ordersData'

export default function AddressForm({ data, onChange, onNext, onBack }) {
  const [useSaved, setUseSaved] = useState(data.savedAddressId != null)
  const [savedId, setSavedId] = useState(data.savedAddressId || SAVED_ADDRESSES[0]?.id || null)
  const [form, setForm] = useState({
    street: data.street || '',
    suburb: data.suburb || '',
    state: data.state || 'NSW',
    postcode: data.postcode || '',
    instructions: data.instructions || '',
  })
  const [errors, setErrors] = useState({})

  const updateForm = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const validate = () => {
    if (useSaved) return true
    const e = {}
    if (!form.street.trim()) e.street = 'Street address is required'
    if (!form.suburb.trim()) e.suburb = 'Suburb is required'
    if (!form.postcode.trim() || !/^\d{4}$/.test(form.postcode)) e.postcode = 'Valid 4-digit postcode required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (!validate()) return
    if (useSaved) {
      const addr = SAVED_ADDRESSES.find(a => a.id === savedId)
      onChange({ savedAddressId: savedId, ...addr })
    } else {
      onChange({ savedAddressId: null, ...form })
    }
    onNext()
  }

  return (
    <div className="page-enter">
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '24px', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
        Delivery Address
      </h2>
      <p style={{ color: 'var(--color-sage)', fontSize: '14px', marginBottom: '28px' }}>
        Where should we deliver your order?
      </p>

      {/* Saved addresses */}
      {SAVED_ADDRESSES.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <label className="form-check">
              <input
                type="checkbox"
                checked={useSaved}
                onChange={e => setUseSaved(e.target.checked)}
                aria-label="Use saved address"
              />
              <span className="form-check-label" style={{ fontWeight: 600, fontSize: '14px' }}>
                Use a saved address
              </span>
            </label>
          </div>

          {useSaved && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }} className="anim-fade-in">
              {SAVED_ADDRESSES.map(addr => (
                <div
                  key={addr.id}
                  className={`delivery-card ${savedId === addr.id ? 'selected' : ''}`}
                  onClick={() => setSavedId(addr.id)}
                  role="radio"
                  aria-checked={savedId === addr.id}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSavedId(addr.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '22px' }}>{addr.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-charcoal)' }}>
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="badge badge-gold" style={{ fontSize: '10px', padding: '2px 7px' }}>Default</span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-sage)' }}>
                      {addr.street}, {addr.suburb} {addr.state} {addr.postcode}
                    </div>
                    {addr.instructions && (
                      <div style={{ fontSize: '12px', color: 'var(--color-sage)', marginTop: '2px' }}>
                        📝 {addr.instructions}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button
                className="btn btn-secondary btn-sm"
                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={() => setUseSaved(false)}
              >
                <Plus size={14} />
                Use a different address
              </button>
            </div>
          )}
        </div>
      )}

      {/* Manual address form */}
      {!useSaved && (
        <div className="anim-fade-in">
          <div className="form-group">
            <label className="form-label" htmlFor="street">Street Address *</label>
            <input
              id="street"
              type="text"
              className={`form-input ${errors.street ? 'error' : ''}`}
              placeholder="e.g. 42 George Street"
              value={form.street}
              onChange={e => updateForm('street', e.target.value)}
            />
            {errors.street && <span className="form-error">{errors.street}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="suburb">Suburb *</label>
              <input
                id="suburb"
                type="text"
                className={`form-input ${errors.suburb ? 'error' : ''}`}
                placeholder="e.g. Sydney"
                value={form.suburb}
                onChange={e => updateForm('suburb', e.target.value)}
              />
              {errors.suburb && <span className="form-error">{errors.suburb}</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="state">State</label>
                <select
                  id="state"
                  className="form-select"
                  value={form.state}
                  onChange={e => updateForm('state', e.target.value)}
                >
                  {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="postcode">Postcode *</label>
                <input
                  id="postcode"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  className={`form-input ${errors.postcode ? 'error' : ''}`}
                  placeholder="2000"
                  value={form.postcode}
                  onChange={e => updateForm('postcode', e.target.value.replace(/\D/g, ''))}
                />
                {errors.postcode && <span className="form-error">{errors.postcode}</span>}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="instructions">Delivery Instructions (optional)</label>
            <textarea
              id="instructions"
              className="form-textarea"
              placeholder="e.g. Leave at door, buzz apartment 4B, call on arrival…"
              value={form.instructions}
              onChange={e => updateForm('instructions', e.target.value)}
              style={{ minHeight: '80px' }}
            />
          </div>
        </div>
      )}

      {/* ETA badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        background: 'var(--color-success-light)',
        border: '1px solid rgba(92, 138, 111, 0.2)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '28px',
        fontSize: '13px',
        color: 'var(--color-charcoal)',
        fontWeight: 600,
      }}>
        <Clock size={16} color="var(--color-success)" />
        <span>Estimated delivery: <span style={{ color: 'var(--color-success)' }}>25–35 minutes</span></span>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-secondary" onClick={onBack} id="address-back">← Back</button>
        <button className="btn btn-primary btn-lg" onClick={handleNext} id="address-next" style={{ flex: 1 }}>
          Continue to Payment
        </button>
      </div>
    </div>
  )
}
