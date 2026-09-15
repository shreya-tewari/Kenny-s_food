import React, { useState } from 'react'
import { Check, MapPin, CreditCard, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function OrderReview({ checkoutData, onBack }) {
  const { items, subtotal, tax, deliveryFee, total, discountAmount, clearCart } = useCart()
  const { addToast } = useApp()
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)
  const [placing, setPlacing] = useState(false)

  const handlePlaceOrder = () => {
    if (!agreed) {
      addToast('Please accept the terms and conditions', 'error')
      return
    }
    setPlacing(true)
    // Simulate API call
    setTimeout(() => {
      clearCart()
      navigate('/order-confirmation', {
        state: {
          orderId: `KP-${Date.now().toString().slice(-6)}`,
          type: checkoutData.delivery?.type || 'delivery',
          pickupSlot: checkoutData.delivery?.pickupSlot,
          address: checkoutData.address,
          items,
          total,
        }
      })
    }, 1500)
  }

  const delivery = checkoutData.delivery || {}
  const address = checkoutData.address || {}
  const payment = checkoutData.payment || {}

  const paymentLabel = payment.method === 'cash'
    ? 'Pay in Person (Cash / Terminal)'
    : `Card ending in •••• ${payment.number?.slice(-4) || '****'}`

  return (
    <div className="page-enter">
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '24px', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
        Review Your Order
      </h2>
      <p style={{ color: 'var(--color-sage)', fontSize: '14px', marginBottom: '28px' }}>
        Everything look good? Place your order below.
      </p>

      {/* Order items */}
      <div className="card card-sm" style={{ marginBottom: '16px' }}>
        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <ShoppingBag size={16} color="var(--color-gold)" />
            <span style={{ fontWeight: 700, fontSize: '14px' }}>Your Items ({items.length})</span>
          </div>
          {items.map(item => (
            <div key={item.cartId} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid var(--color-taupe)',
            }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.qty}× {item.name}</span>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-gold)' }}>
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery / Address / Payment details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div className="card card-sm">
          <div className="card-body">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <MapPin size={14} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                  {delivery.type === 'pickup' ? 'Pickup' : 'Delivery'}
                </div>
                {delivery.type === 'pickup' ? (
                  <div style={{ fontSize: '12px', color: 'var(--color-sage)' }}>
                    42 George St, Sydney<br />
                    {delivery.pickupSlot && <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>At {delivery.pickupSlot}</span>}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: 'var(--color-sage)' }}>
                    {address.street}, {address.suburb}<br />
                    {address.state} {address.postcode}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card card-sm">
          <div className="card-body">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <CreditCard size={14} color="var(--color-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>Payment</div>
                <div style={{ fontSize: '12px', color: 'var(--color-sage)' }}>{paymentLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order summary totals */}
      <div className="card card-sm" style={{ marginBottom: '20px' }}>
        <div className="card-body">
          <div className="summary-table">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="summary-row">
                <span className="summary-label" style={{ color: 'var(--color-success)' }}>Promo discount</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>−${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span className="summary-label">Delivery fee</span>
              <span className="summary-value">{delivery.type === 'pickup' ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">GST (10%)</span>
              <span className="summary-value">${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row summary-row--total">
              <span className="summary-label" style={{ fontSize: '18px' }}>Total</span>
              <span>${(delivery.type === 'pickup' ? total - deliveryFee : total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* T&C */}
      <label className="form-check" style={{ marginBottom: '24px', alignItems: 'flex-start' }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          aria-label="Accept terms and conditions"
          style={{ marginTop: '2px' }}
        />
        <span className="form-check-label" style={{ fontSize: '13px', color: 'var(--color-sage)', lineHeight: 1.5 }}>
          I agree to Kenny's Pork Rolls'{' '}
          <a href="#" className="link" style={{ color: 'var(--color-gold)' }}>Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="link" style={{ color: 'var(--color-gold)' }}>Privacy Policy</a>.
        </span>
      </label>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-secondary" onClick={onBack} disabled={placing} id="review-back">← Back</button>
        <button
          className={`btn btn-primary btn-lg ${placing ? 'btn-loading' : ''}`}
          onClick={handlePlaceOrder}
          disabled={placing}
          id="place-order"
          style={{ flex: 1 }}
        >
          {placing ? 'Placing Order…' : '🎉 Place Order'}
        </button>
      </div>
    </div>
  )
}
