import React, { useState } from 'react'
import { X, Minus, Plus, Tag, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function ShoppingCart() {
  const {
    items, itemCount, subtotal, discountAmount, tax, deliveryFee, total,
    promoCode, removeItem, updateQty, applyPromo, removePromo,
  } = useCart()
  const { cartOpen, closeCart, addToast } = useApp()
  const navigate = useNavigate()
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')
  const [promoSuccess, setPromoSuccess] = useState(false)

  if (!cartOpen) return null

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    const success = applyPromo(promoInput.trim())
    if (success) {
      setPromoSuccess(true)
      setPromoError('')
      addToast(`Promo code applied!`, 'success')
    } else {
      setPromoError('Invalid promo code. Try KENNY10 or FIRSTORDER.')
      setPromoSuccess(false)
    }
  }

  const handleCheckout = () => {
    closeCart()
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    navigate('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div className="overlay" onClick={closeCart} aria-hidden />

      {/* Cart panel */}
      <aside
        className="sidebar-panel"
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--color-gold)" />
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-charcoal)',
            }}>
              Your Order
            </h2>
            {itemCount > 0 && (
              <span className="badge badge-gold" style={{ fontSize: '12px' }}>
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            className="modal-close"
            onClick={closeCart}
            aria-label="Close cart"
            id="close-cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="sidebar-body">
          {items.length === 0 ? (
            <div className="empty-state" style={{ paddingTop: '40px' }}>
              <div style={{ fontSize: '56px' }}>🛒</div>
              <h3 className="empty-state__title">Your cart is empty</h3>
              <p className="empty-state__desc">Add some delicious items to get started!</p>
              <button className="btn btn-primary" onClick={closeCart} style={{ marginTop: '8px' }}>
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Items */}
              {items.map(item => (
                <div key={item.cartId} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="cart-item__image"
                  />
                  <div className="cart-item__info">
                    <div className="cart-item__name">{item.name}</div>
                    {item.customisations && Object.keys(item.customisations).length > 0 && (
                      <div className="cart-item__mods">
                        {Object.entries(item.customisations)
                          .filter(([, v]) => v)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' · ')}
                      </div>
                    )}
                    <div className="cart-item__bottom">
                      {/* Qty control */}
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.cartId, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.cartId, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="cart-item__price">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.cartId)}
                    aria-label={`Remove ${item.name} from cart`}
                    style={{
                      flexShrink: 0,
                      padding: '4px',
                      color: 'var(--color-sage)',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'color 0.2s',
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-error)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-sage)'}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              {/* Promo Code */}
              <div style={{
                marginTop: '16px',
                padding: '16px',
                background: 'var(--color-gold-pale)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(201, 169, 97, 0.2)',
              }}>
                {promoCode ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag size={14} color="var(--color-success)" />
                      <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-charcoal)' }}>
                        {promoCode} applied!
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--color-success)', fontWeight: 700 }}>
                        −${discountAmount.toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="btn-ghost"
                      onClick={removePromo}
                      style={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="promo-row">
                      <div className="input-wrapper" style={{ flex: 1 }}>
                        <Tag size={14} className="input-icon-left" />
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Promo code"
                          value={promoInput}
                          onChange={e => { setPromoInput(e.target.value); setPromoError('') }}
                          onKeyDown={e => e.key === 'Enter' && handleApplyPromo()}
                          style={{ paddingLeft: '36px', padding: '10px 10px 10px 36px' }}
                          aria-label="Enter promo code"
                        />
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleApplyPromo}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p style={{ fontSize: '12px', color: 'var(--color-error)', marginTop: '6px' }}>
                        {promoError}
                      </p>
                    )}
                    <p style={{ fontSize: '11px', color: 'var(--color-sage)', marginTop: '6px' }}>
                      Try: KENNY10 · FIRSTORDER · PORKROLL5
                    </p>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="sidebar-footer">
            <div className="summary-table" style={{ marginBottom: '16px' }}>
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row">
                  <span className="summary-label" style={{ color: 'var(--color-success)' }}>Promo discount</span>
                  <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>−${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span className="summary-label">Delivery fee</span>
                <span className="summary-value">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">GST (10%)</span>
                <span className="summary-value">${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row summary-row--total">
                <span className="summary-label">Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={handleCheckout}
              id="proceed-to-checkout"
              aria-label="Proceed to checkout"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-secondary btn-full"
              onClick={closeCart}
              style={{ marginTop: '10px' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
