import React, { useState } from 'react'
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react'
import { SAVED_ADDRESSES } from '../../data/ordersData'

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES)
  const [adding, setAdding] = useState(false)
  const [newAddr, setNewAddr] = useState({ label: '', street: '', suburb: '', state: 'NSW', postcode: '', instructions: '' })

  const deleteAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id))
  const setDefault = (id) => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))

  const addAddress = () => {
    if (!newAddr.street || !newAddr.suburb || !newAddr.postcode) return
    setAddresses(prev => [...prev, {
      id: Date.now(),
      icon: '📍',
      ...newAddr,
      isDefault: false,
    }])
    setNewAddr({ label: '', street: '', suburb: '', state: 'NSW', postcode: '', instructions: '' })
    setAdding(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '22px', color: 'var(--color-charcoal)' }}>
          Saved Addresses
        </h2>
        <button className="btn btn-primary btn-sm" onClick={() => setAdding(a => !a)} id="add-new-address">
          <Plus size={14} />
          Add New Address
        </button>
      </div>

      {/* Add address form */}
      {adding && (
        <div className="card anim-fade-in" style={{ marginBottom: '24px', border: '2px solid var(--color-gold)' }}>
          <div className="card-body">
            <h4 style={{ fontWeight: 700, marginBottom: '16px', color: 'var(--color-charcoal)' }}>New Address</h4>
            <div className="form-row" style={{ marginBottom: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Label</label>
                <input className="form-input" placeholder="e.g. Home, Office" value={newAddr.label} onChange={e => setNewAddr(p => ({ ...p, label: e.target.value }))} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Street *</label>
                <input className="form-input" placeholder="Street address" value={newAddr.street} onChange={e => setNewAddr(p => ({ ...p, street: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Suburb *</label>
                <input className="form-input" placeholder="Suburb" value={newAddr.suburb} onChange={e => setNewAddr(p => ({ ...p, suburb: e.target.value }))} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">State</label>
                <select className="form-select" value={newAddr.state} onChange={e => setNewAddr(p => ({ ...p, state: e.target.value }))}>
                  {['NSW','VIC','QLD','WA','SA','TAS','ACT','NT'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Postcode *</label>
                <input className="form-input" placeholder="2000" maxLength={4} value={newAddr.postcode} onChange={e => setNewAddr(p => ({ ...p, postcode: e.target.value.replace(/\D/g, '') }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Instructions</label>
              <input className="form-input" placeholder="Optional notes" value={newAddr.instructions} onChange={e => setNewAddr(p => ({ ...p, instructions: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary" onClick={addAddress}>Save Address</button>
              <button className="btn btn-secondary" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="empty-state">
          <MapPin size={40} color="var(--color-taupe)" />
          <h3 className="empty-state__title">No saved addresses</h3>
          <p className="empty-state__desc">Save an address to speed up your next checkout.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {addresses.map(addr => (
            <div key={addr.id} className="card" style={{ borderColor: addr.isDefault ? 'var(--color-gold)' : 'var(--color-taupe)', borderWidth: addr.isDefault ? '2px' : '1px' }}>
              <div className="card-body" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '24px', lineHeight: 1 }}>{addr.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-charcoal)' }}>
                      {addr.label || 'Address'}
                    </span>
                    {addr.isDefault && (
                      <span className="badge badge-gold" style={{ fontSize: '10px', padding: '2px 8px' }}>Default</span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--color-sage)', lineHeight: 1.5 }}>
                    {addr.street}, {addr.suburb} {addr.state} {addr.postcode}
                  </p>
                  {addr.instructions && (
                    <p style={{ fontSize: '12px', color: 'var(--color-sage)', marginTop: '4px' }}>
                      📝 {addr.instructions}
                    </p>
                  )}
                  {!addr.isDefault && (
                    <button
                      className="btn-ghost btn-sm"
                      onClick={() => setDefault(addr.id)}
                      style={{ marginTop: '8px', padding: '4px 0', fontSize: '12px', color: 'var(--color-gold)' }}
                    >
                      Set as default
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn-icon" aria-label="Edit address" style={{ color: 'var(--color-gold)' }}>
                    <Edit2 size={15} />
                  </button>
                  <button
                    className="btn-icon"
                    aria-label="Delete address"
                    onClick={() => deleteAddress(addr.id)}
                    style={{ color: 'var(--color-sage)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-error)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-sage)'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
