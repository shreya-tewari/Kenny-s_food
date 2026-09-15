import React, { useState } from 'react'
import { Bell, CreditCard, Utensils, Lock, ChevronRight } from 'lucide-react'

const NOTIFICATION_PREFS = [
  { id: 'order_updates', label: 'Order status updates', description: 'Receive real-time updates on your order', defaultOn: true },
  { id: 'promotions', label: 'Promotions & offers', description: 'Weekly specials and exclusive deals', defaultOn: true },
  { id: 'new_items', label: 'New menu items', description: 'Be the first to know about new dishes', defaultOn: false },
  { id: 'newsletter', label: 'Newsletter', description: 'Monthly roundup and Kenny\'s news', defaultOn: false },
]

const DIETARY_PREFS = [
  { id: 'gf', label: 'Gluten Free' },
  { id: 'dairy_free', label: 'Dairy Free' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'nut_free', label: 'Nut Free' },
  { id: 'low_spice', label: 'Mild (Low Spice)' },
]

function Toggle({ on, onChange, id }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      id={id}
      onClick={() => onChange(!on)}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        background: on ? 'var(--color-gold)' : 'var(--color-taupe)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: '3px',
        left: on ? '23px' : '3px',
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        background: 'white',
        transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  )
}

export default function Settings() {
  const [notifications, setNotifications] = useState(() =>
    Object.fromEntries(NOTIFICATION_PREFS.map(n => [n.id, n.defaultOn]))
  )
  const [dietary, setDietary] = useState([])

  const toggleNotif = (id, val) => setNotifications(p => ({ ...p, [id]: val }))
  const toggleDietary = (id) => setDietary(p => p.includes(id) ? p.filter(d => d !== id) : [...p, id])

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '22px', marginBottom: '32px', color: 'var(--color-charcoal)' }}>
        Settings
      </h2>

      {/* Notifications */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Bell size={18} color="var(--color-gold)" />
          <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', color: 'var(--color-charcoal)' }}>
            Notifications
          </h3>
        </div>
        <div className="card card-sm">
          <div className="card-body" style={{ padding: '0' }}>
            {NOTIFICATION_PREFS.map((pref, idx) => (
              <div key={pref.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                borderBottom: idx < NOTIFICATION_PREFS.length - 1 ? '1px solid var(--color-taupe)' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-charcoal)', marginBottom: '2px' }}>
                    {pref.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-sage)' }}>{pref.description}</div>
                </div>
                <Toggle
                  on={notifications[pref.id]}
                  onChange={val => toggleNotif(pref.id, val)}
                  id={`notif-${pref.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dietary preferences */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Utensils size={18} color="var(--color-gold)" />
          <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', color: 'var(--color-charcoal)' }}>
            Dietary Preferences
          </h3>
        </div>
        <div className="card card-sm">
          <div className="card-body">
            <p style={{ fontSize: '13px', color: 'var(--color-sage)', marginBottom: '16px' }}>
              We'll highlight menu items matching your dietary needs.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {DIETARY_PREFS.map(d => (
                <button
                  key={d.id}
                  className={`filter-chip ${dietary.includes(d.id) ? 'active' : ''}`}
                  onClick={() => toggleDietary(d.id)}
                  aria-pressed={dietary.includes(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment methods */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <CreditCard size={18} color="var(--color-gold)" />
          <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', color: 'var(--color-charcoal)' }}>
            Payment Methods
          </h3>
        </div>
        <div className="card card-sm">
          <div className="card-body" style={{ padding: '0' }}>
            {[
              { icon: '💳', label: 'Visa ending in 4242', sub: 'Expires 08/2027', badge: 'Default' },
            ].map((pm, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
              }}>
                <span style={{ fontSize: '22px' }}>{pm.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-charcoal)' }}>{pm.label}</span>
                    {pm.badge && <span className="badge badge-gold" style={{ fontSize: '10px', padding: '2px 7px' }}>{pm.badge}</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-sage)' }}>{pm.sub}</div>
                </div>
                <ChevronRight size={16} color="var(--color-sage)" />
              </div>
            ))}
            <div style={{ padding: '0 20px 16px' }}>
              <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                + Add Payment Method
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Lock size={18} color="var(--color-gold)" />
          <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', color: 'var(--color-charcoal)' }}>
            Security
          </h3>
        </div>
        <div className="card card-sm">
          <div className="card-body" style={{ padding: '0' }}>
            {['Change Password', 'Two-Factor Authentication', 'Delete Account'].map((item, idx) => (
              <button
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '16px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: idx < 2 ? '1px solid var(--color-taupe)' : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                  color: item === 'Delete Account' ? 'var(--color-error)' : 'var(--color-charcoal)',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-cream-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                {item}
                <ChevronRight size={16} color={item === 'Delete Account' ? 'var(--color-error)' : 'var(--color-sage)'} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Save button */}
      <div style={{ marginTop: '32px' }}>
        <button className="btn btn-primary btn-lg" id="save-settings">
          Save Changes
        </button>
      </div>
    </div>
  )
}
