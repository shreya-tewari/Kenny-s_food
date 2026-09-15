import React from 'react'
import { RotateCcw, ChevronRight } from 'lucide-react'
import { ORDER_HISTORY } from '../../data/ordersData'
import { useNavigate } from 'react-router-dom'

function statusBadge(status) {
  const map = {
    delivered: { label: 'Delivered', cls: 'order-status--delivered' },
    pending:   { label: 'Pending',   cls: 'order-status--pending' },
    cancelled: { label: 'Cancelled', cls: 'order-status--cancelled' },
    preparing: { label: 'Preparing', cls: 'order-status--preparing' },
  }
  const { label, cls } = map[status] || map.pending
  return <span className={`order-status ${cls}`}>{label}</span>
}

export default function OrderHistory() {
  const navigate = useNavigate()

  return (
    <div>
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '22px', marginBottom: '24px', color: 'var(--color-charcoal)' }}>
        Order History
      </h2>
      {ORDER_HISTORY.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '48px' }}>🛍️</div>
          <h3 className="empty-state__title">No orders yet</h3>
          <p className="empty-state__desc">Your completed orders will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {ORDER_HISTORY.map(order => (
            <div key={order.id} className="card" style={{ transition: 'all 0.2s' }}>
              <div className="card-body" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span className="mono" style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-charcoal)' }}>
                        {order.id}
                      </span>
                      {statusBadge(order.status)}
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--color-sage)',
                        background: order.type === 'pickup' ? 'var(--color-gold-pale)' : 'var(--color-info-light)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 600,
                      }}>
                        {order.type === 'pickup' ? '🏪 Pickup' : '🚴 Delivery'}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-sage)', marginBottom: '8px' }}>
                      {order.date} · {order.time}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>
                      {order.items.map(i => `${i.qty}× ${i.name}`).join(', ')}
                    </p>
                    {order.cancellationReason && (
                      <p style={{ fontSize: '12px', color: 'var(--color-error)', marginTop: '6px' }}>
                        ⚠ {order.cancellationReason}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '20px', color: 'var(--color-gold)', marginBottom: '8px' }}>
                      ${order.total.toFixed(2)}
                    </div>
                    {order.status !== 'cancelled' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
                      >
                        <RotateCcw size={12} />
                        Order Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
