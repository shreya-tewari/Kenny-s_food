import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CheckoutStepper from '../components/CheckoutFlow/CheckoutStepper'
import DeliveryPickup from '../components/CheckoutFlow/DeliveryPickup'
import AddressForm from '../components/CheckoutFlow/AddressForm'
import PaymentForm from '../components/CheckoutFlow/PaymentForm'
import OrderReview from '../components/CheckoutFlow/OrderReview'
import { useCart } from '../context/CartContext'
import { ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const { items, subtotal, tax, deliveryFee, total, itemCount } = useCart()
  const [step, setStep] = useState(1)
  const [checkoutData, setCheckoutData] = useState({
    delivery: {},
    address: {},
    payment: {},
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [step])

  const updateSection = (section, data) =>
    setCheckoutData(prev => ({ ...prev, [section]: data }))

  // Redirect if cart is empty
  if (itemCount === 0 && step < 4) {
    return (
      <main id="main-content" style={{ background: 'var(--color-cream)', minHeight: '100vh', paddingTop: '72px' }}>
        <div className="container" style={{ maxWidth: '600px', paddingTop: '80px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '28px', marginBottom: '12px' }}>
            Your cart is empty
          </h1>
          <p style={{ color: 'var(--color-sage)', marginBottom: '28px' }}>
            Add some delicious items before proceeding to checkout.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Browse Menu
          </Link>
        </div>
      </main>
    )
  }

  const isPickup = checkoutData.delivery?.type === 'pickup'
  const isDelivery = !isPickup
  const orderTotal = isDelivery ? total : Math.max(0, total - deliveryFee)

  return (
    <main id="main-content" style={{ background: 'var(--color-cream)', minHeight: '100vh', paddingTop: '72px' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        {/* Back link */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: 'var(--color-sage)',
            textDecoration: 'none',
            marginBottom: '28px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-sage)'}
        >
          <ArrowLeft size={16} />
          Back to Menu
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'flex-start' }} className="checkout-grid">
          {/* Left — form area */}
          <div>
            <CheckoutStepper currentStep={step} isPickup={isPickup} />

            {/* Step 1: Delivery or Pickup Selection */}
            {step === 1 && (
              <DeliveryPickup
                data={checkoutData.delivery}
                onChange={data => updateSection('delivery', data)}
                onNext={() => setStep(2)}
              />
            )}

            {/* Step 2 (Delivery): Address Form */}
            {!isPickup && step === 2 && (
              <AddressForm
                data={checkoutData.address}
                onChange={data => updateSection('address', data)}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}

            {/* Payment Step: Step 2 if Pickup, Step 3 if Delivery */}
            {((isPickup && step === 2) || (!isPickup && step === 3)) && (
              <PaymentForm
                data={checkoutData.payment}
                onChange={data => updateSection('payment', data)}
                onNext={() => setStep(isPickup ? 3 : 4)}
                onBack={() => setStep(isPickup ? 1 : 2)}
                cart={{ subtotal, tax }}
              />
            )}

            {/* Review Step: Step 3 if Pickup, Step 4 if Delivery */}
            {((isPickup && step === 3) || (!isPickup && step === 4)) && (
              <OrderReview
                checkoutData={checkoutData}
                onBack={() => setStep(isPickup ? 2 : 3)}
              />
            )}
          </div>

          {/* Right — order summary */}
          <div style={{ position: 'sticky', top: '88px' }}>
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <ShoppingBag size={18} color="var(--color-gold)" />
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px' }}>
                    Order Summary
                  </h3>
                  <span className="badge badge-gold" style={{ marginLeft: 'auto', fontSize: '11px' }}>
                    {itemCount} item{itemCount !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Items list */}
                <div style={{ marginBottom: '16px', maxHeight: '200px', overflowY: 'auto' }}>
                  {items.map(item => (
                    <div key={item.cartId} style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      paddingBottom: '10px',
                      marginBottom: '10px',
                      borderBottom: '1px solid var(--color-taupe)',
                    }}>
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-charcoal)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.qty}× {item.name}
                        </div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-gold)', flexShrink: 0 }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="summary-table">
                  <div className="summary-row">
                    <span className="summary-label">Subtotal</span>
                    <span className="summary-value">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Delivery</span>
                    <span className="summary-value">
                      {checkoutData.delivery?.type === 'pickup' ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">GST (10%)</span>
                    <span className="summary-value">${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row summary-row--total">
                    <span className="summary-label" style={{ fontSize: '18px' }}>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .checkout-grid > div:last-child {
            position: static !important;
            order: -1;
          }
        }
      `}</style>
    </main>
  )
}
