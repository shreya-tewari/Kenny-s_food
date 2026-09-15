import React, { useState } from 'react'
import { Heart, Plus } from 'lucide-react'
import { MENU_ITEMS } from '../../data/menuData'
import { FAVOURITE_IDS } from '../../data/ordersData'
import { useCart } from '../../context/CartContext'
import { useApp } from '../../context/AppContext'

export default function Favorites() {
  const [favourites, setFavourites] = useState(FAVOURITE_IDS)
  const { addItem } = useCart()
  const { addToast } = useApp()

  const favItems = MENU_ITEMS.filter(m => favourites.includes(m.id))

  const removeFavourite = (id) => {
    setFavourites(prev => prev.filter(f => f !== id))
    addToast('Removed from favourites', 'info')
  }

  const handleQuickAdd = (e, item) => {
    e.stopPropagation()
    addItem(item)
    addToast(`${item.name} added to cart!`, 'success')
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '22px', marginBottom: '24px', color: 'var(--color-charcoal)' }}>
        Favourites
      </h2>

      {favItems.length === 0 ? (
        <div className="empty-state">
          <Heart size={40} color="var(--color-taupe)" />
          <h3 className="empty-state__title">No favourites yet</h3>
          <p className="empty-state__desc">Tap the heart on any product to save it here for quick access.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px',
        }}>
          {favItems.map(item => (
            <div key={item.id} className="product-card" style={{ cursor: 'default' }}>
              <div className="product-card__image-wrapper">
                <img src={item.image} alt={item.imageAlt} className="product-card__image" loading="lazy" />
                {/* Remove favourite */}
                <button
                  onClick={() => removeFavourite(item.id)}
                  aria-label={`Remove ${item.name} from favourites`}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(15,20,25,0.5)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(193, 81, 74, 0.8)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(15,20,25,0.5)'}
                >
                  <Heart size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                </button>
              </div>
              <div className="product-card__body">
                <h3 className="product-card__name">{item.name}</h3>
                <p className="product-card__desc">{item.shortDesc}</p>
                <div className="product-card__footer">
                  <span className="price product-card__price">{item.priceDisplay}</span>
                  <button
                    className="btn-add-cart"
                    onClick={e => handleQuickAdd(e, item)}
                    aria-label={`Quick add ${item.name} to cart`}
                    id={`quick-add-${item.id}`}
                  >
                    <Plus size={13} style={{ display: 'inline', marginRight: '3px' }} />
                    Add
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
