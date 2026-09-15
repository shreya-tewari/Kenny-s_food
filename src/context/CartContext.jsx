import React, { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],
  promoCode: null,
  promoDiscount: 0,
}

const DELIVERY_FEE = 4.99
const TAX_RATE = 0.1

const PROMO_CODES = {
  'KENNY10': 0.10,
  'FIRSTORDER': 0.15,
  'PORKROLL5': 0.05,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.cartId === action.payload.cartId)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.cartId === action.payload.cartId
              ? { ...i, qty: i.qty + 1 }
              : i
          )
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartId !== action.payload) }
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.cartId !== action.payload.cartId) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartId === action.payload.cartId ? { ...i, qty: action.payload.qty } : i
        )
      }
    }
    case 'CLEAR_CART':
      return { ...initialState }
    case 'APPLY_PROMO': {
      const discount = PROMO_CODES[action.payload.toUpperCase()]
      if (discount) {
        return { ...state, promoCode: action.payload.toUpperCase(), promoDiscount: discount }
      }
      return { ...state, promoCode: null, promoDiscount: 0 }
    }
    case 'REMOVE_PROMO':
      return { ...state, promoCode: null, promoDiscount: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discountAmount = subtotal * state.promoDiscount
  const discountedSubtotal = subtotal - discountAmount
  const tax = discountedSubtotal * TAX_RATE
  const deliveryFee = state.items.length > 0 ? DELIVERY_FEE : 0
  const total = discountedSubtotal + tax + deliveryFee
  const itemCount = state.items.reduce((sum, item) => sum + item.qty, 0)

  const addItem = useCallback((product, customisations = {}) => {
    const cartId = `${product.id}_${JSON.stringify(customisations)}_${Date.now()}`
    dispatch({ type: 'ADD_ITEM', payload: { ...product, cartId, customisations } })
  }, [])

  const removeItem = useCallback((cartId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartId })
  }, [])

  const updateQty = useCallback((cartId, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { cartId, qty } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const applyPromo = useCallback((code) => {
    const discount = PROMO_CODES[code.toUpperCase()]
    dispatch({ type: 'APPLY_PROMO', payload: code })
    return !!discount
  }, [])

  const removePromo = useCallback(() => {
    dispatch({ type: 'REMOVE_PROMO' })
  }, [])

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount,
      subtotal,
      discountAmount,
      discountedSubtotal,
      tax,
      deliveryFee,
      total,
      promoCode: state.promoCode,
      promoDiscount: state.promoDiscount,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      applyPromo,
      removePromo,
      PROMO_CODES,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
