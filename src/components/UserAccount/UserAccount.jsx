import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import OrderHistory from './OrderHistory'
import SavedAddresses from './SavedAddresses'
import Favorites from './Favorites'
import Settings from './Settings'
import { ClipboardList, MapPin, Heart, Settings as SettingsIcon } from 'lucide-react'

const TABS = [
  { id: 'orders',    label: 'Orders',           icon: ClipboardList },
  { id: 'addresses', label: 'Saved Addresses',  icon: MapPin },
  { id: 'favorites', label: 'Favourites',        icon: Heart },
  { id: 'settings',  label: 'Settings',          icon: SettingsIcon },
]

export default function UserAccount() {
  const { user } = useApp()
  const [activeTab, setActiveTab] = useState('orders')

  return (
    <main id="main-content" style={{ background: 'var(--color-cream)', minHeight: '100vh', paddingTop: '72px' }}>
      {/* Profile header */}
      <div style={{ background: 'var(--gradient-hero)', padding: '40px 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', paddingBottom: '24px' }}>
            <div className="avatar" style={{ width: '72px', height: '72px', fontSize: '28px', border: '3px solid var(--color-gold)' }}>
              {user.initials}
            </div>
            <div style={{ flex: 1, paddingBottom: '4px' }}>
              <h1 style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                fontSize: '26px',
                color: 'var(--color-cream)',
                marginBottom: '2px',
              }}>
                {user.name}
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--color-sage)' }}>{user.email}</p>
            </div>
            <div style={{
              padding: '8px 16px',
              background: 'rgba(201, 169, 97, 0.12)',
              border: '1px solid rgba(201, 169, 97, 0.25)',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--color-gold)',
              fontSize: '13px',
              fontWeight: 700,
            }}>
              ⭐ Kenny's Member
            </div>
          </div>

          {/* Tab nav */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid rgba(212, 197, 185, 0.1)', overflowX: 'auto' }}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-selected={activeTab === id}
                id={`account-tab-${id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${activeTab === id ? 'var(--color-gold)' : 'transparent'}`,
                  marginBottom: '-2px',
                  color: activeTab === id ? 'var(--color-gold)' : 'var(--color-sage)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div className="page-enter">
          {activeTab === 'orders'    && <OrderHistory />}
          {activeTab === 'addresses' && <SavedAddresses />}
          {activeTab === 'favorites' && <Favorites />}
          {activeTab === 'settings'  && <Settings />}
        </div>
      </div>
    </main>
  )
}
