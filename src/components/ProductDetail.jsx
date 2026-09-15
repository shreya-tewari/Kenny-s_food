import React, { useState } from 'react'
import { X, Plus, Minus, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import { REVIEWS } from '../data/menuData'

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? 'var(--color-gold)' : 'var(--color-taupe)', fontSize: '16px' }}>★</span>
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { selectedProduct, closeProductDetail, addToast } = useApp()
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedAddons, setSelectedAddons] = useState([])
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [qty, setQty] = useState(1)
  const [imgIndex, setImgIndex] = useState(0)

  if (!selectedProduct) return null

  const product = selectedProduct
  const reviews = REVIEWS[product.id] || []
  const images = product.hoverImage ? [product.image, product.hoverImage] : [product.image, product.image]
  const sizes = product.customisations?.size || []
  const addons = product.customisations?.addons || []

  const addonTotal = selectedAddons.reduce((sum, label) => {
    const a = addons.find(x => x.label === label)
    return sum + (a?.price || 0)
  }, 0)

  const sizeExtra = selectedSize?.includes('(+$')
    ? parseFloat(selectedSize.match(/\+\$([0-9.]+)/)?.[1] || 0)
    : 0

  const lineTotal = (product.price + addonTotal + sizeExtra) * qty

  const toggleAddon = (label) => {
    setSelectedAddons(prev =>
      prev.includes(label) ? prev.filter(a => a !== label) : [...prev, label]
    )
  }

  const handleAddToCart = () => {
    const customisations = {
      ...(selectedSize ? { size: selectedSize } : {}),
      ...(selectedAddons.length > 0 ? { addons: selectedAddons.join(', ') } : {}),
      ...(specialInstructions ? { instructions: specialInstructions } : {}),
    }
    for (let i = 0; i < qty; i++) {
      addItem({ ...product, price: product.price + addonTotal + sizeExtra }, customisations)
    }
    addToast(`${product.name} added to cart!`, 'success')
    closeProductDetail()
  }

  return (
    <div className="modal-backdrop" onClick={closeProductDetail} role="dialog" aria-modal aria-label={product.name}>
      <div
        className="modal"
        style={{ maxWidth: '760px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{product.name}</h2>
          <button className="modal-close" onClick={closeProductDetail} aria-label="Close" id="close-product-detail">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }} className="product-detail-grid">

            {/* Left — image */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0 0 0 var(--radius-xl)' }}>
              <img
                src={images[imgIndex]}
                alt={product.imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '320px' }}
                onError={(e) => {
                  if (product.hoverImage && e.currentTarget.src !== product.hoverImage) {
                    e.currentTarget.src = product.hoverImage
                  }
                }}
              />
              {/* Image nav */}
              {images.length > 1 && (
                <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      style={{
                        width: i === imgIndex ? '20px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: i === imgIndex ? 'var(--color-gold)' : 'rgba(255,255,255,0.5)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
              {/* Tags */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {product.tags.map(tag => (
                  <span key={tag} className="badge badge-category" style={{ fontSize: '10px' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Right — details */}
            <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '80vh', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StarRating rating={product.rating} />
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-gold)' }}>{product.rating}</span>
                <span style={{ fontSize: '13px', color: 'var(--color-sage)' }}>({product.reviewCount} reviews)</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '14px', color: 'var(--color-sage)', lineHeight: 1.6 }}>
                {product.description}
              </p>

              {/* Size selection */}
              {sizes.length > 0 && (
                <div>
                  <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Size</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s === selectedSize ? null : s)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 'var(--radius-md)',
                          border: `1.5px solid ${selectedSize === s ? 'var(--color-gold)' : 'var(--color-taupe)'}`,
                          background: selectedSize === s ? 'var(--color-gold-pale)' : 'var(--color-cream)',
                          color: selectedSize === s ? 'var(--color-charcoal)' : 'var(--color-sage)',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        aria-pressed={selectedSize === s}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {addons.length > 0 && (
                <div>
                  <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Add-ons</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {addons.map(a => (
                      <label key={a.label} className="form-check" style={{
                        padding: '10px 12px',
                        border: `1.5px solid ${selectedAddons.includes(a.label) ? 'var(--color-gold)' : 'var(--color-taupe)'}`,
                        borderRadius: 'var(--radius-md)',
                        background: selectedAddons.includes(a.label) ? 'var(--color-gold-pale)' : 'transparent',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={selectedAddons.includes(a.label)}
                            onChange={() => toggleAddon(a.label)}
                            style={{ accentColor: 'var(--color-gold)' }}
                          />
                          <span style={{ fontSize: '13px', fontWeight: 500 }}>{a.label}</span>
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--color-gold)', fontWeight: 700 }}>
                          {a.price > 0 ? `+$${a.price.toFixed(2)}` : 'Free'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Special instructions */}
              <div>
                <label className="form-label" htmlFor="special-instructions" style={{ marginBottom: '6px', display: 'block' }}>
                  Special Instructions
                </label>
                <textarea
                  id="special-instructions"
                  className="form-textarea"
                  placeholder="e.g. No coriander, extra crispy, mild chilli…"
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                  style={{ minHeight: '72px', fontSize: '13px' }}
                />
              </div>

              {/* Qty + Add to Cart */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">
                    <Minus size={12} />
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(q => q + 1)} aria-label="Increase">
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  className="btn btn-primary btn-full"
                  onClick={handleAddToCart}
                  id="add-to-cart-detail"
                  style={{ flex: 1 }}
                >
                  Add to Cart — ${lineTotal.toFixed(2)}
                </button>
              </div>
            </div>
          </div>

          {/* Reviews section */}
          {reviews.length > 0 && (
            <div style={{
              padding: '24px',
              borderTop: '1px solid var(--color-taupe)',
              background: 'var(--color-cream-dark)',
              borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
            }}>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '16px', marginBottom: '16px', color: 'var(--color-charcoal)' }}>
                Customer Reviews
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reviews.map(r => (
                  <div key={r.id} style={{
                    background: 'white',
                    border: '1px solid var(--color-taupe)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    display: 'flex',
                    gap: '12px',
                  }}>
                    <div className="avatar" style={{ width: '36px', height: '36px', fontSize: '13px', flexShrink: 0 }}>
                      {r.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13px' }}>{r.author}</span>
                        <StarRating rating={r.rating} />
                        <span style={{ fontSize: '11px', color: 'var(--color-sage)', marginLeft: 'auto' }}>{r.date}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--color-sage)', lineHeight: 1.5 }}>{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 640px) {
            .product-detail-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  )
}
