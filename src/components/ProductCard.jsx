import React from 'react'
import { Plus, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'

function StarRating({ rating, reviewCount }) {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < Math.round(rating) ? 'star' : 'star star-empty'}>★</span>
      ))}
      <span className="rating-text">{rating} ({reviewCount})</span>
    </div>
  )
}

export default function ProductCard({ product, onCardClick }) {
  const { addItem } = useCart()
  const { addToast } = useApp()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem(product)
    addToast(`${product.name} added to cart`, 'success')
  }

  const handleCardClick = () => {
    if (onCardClick) onCardClick(product)
  }

  return (
    <article
      className="product-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name} details`}
      onKeyDown={e => e.key === 'Enter' && handleCardClick()}
      id={`product-card-${product.id}`}
    >
      {/* Image */}
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.imageAlt}
          className={`product-card__image ${product.hoverImage ? 'product-card__image--base' : ''}`}
          loading="lazy"
          onError={(e) => {
            if (product.hoverImage && e.currentTarget.src !== product.hoverImage) {
              e.currentTarget.src = product.hoverImage
            }
          }}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            className="product-card__image product-card__image--hover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
        {/* Overlaid badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
        }}>
          {product.isNew && (
            <span className="badge badge-new">NEW</span>
          )}
          {product.isBestseller && (
            <span className="badge" style={{
              background: 'rgba(15, 20, 25, 0.75)',
              color: 'var(--color-gold)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(201, 169, 97, 0.3)',
            }}>
              ⭐ Bestseller
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="product-card__body">
        {/* Category badge */}
        <div>
          <span className="badge badge-category" style={{ fontSize: '10px', padding: '3px 8px' }}>
            {product.category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </span>
        </div>

        {/* Name */}
        <h3 className="product-card__name">{product.name}</h3>

        {/* Rating */}
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        {/* Description */}
        <p className="product-card__desc">{product.shortDesc}</p>

        {/* Footer */}
        <div className="product-card__footer">
          <span className="price product-card__price">{product.priceRange}</span>
          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            id={`add-to-cart-${product.id}`}
          >
            <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
