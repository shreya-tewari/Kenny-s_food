import React, { createContext, useContext, useState, useCallback, useRef } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [user] = useState({
    name: 'Alex Chen',
    email: 'alex@example.com',
    initials: 'AC',
    savedAddresses: [
      { id: 1, label: 'Home', street: '12 Pitt Street', suburb: 'Sydney', postcode: '2000', isDefault: true },
      { id: 2, label: 'Work', street: '1 Martin Place', suburb: 'Sydney', postcode: '2000', isDefault: false },
    ]
  })

  const toastCounter = useRef(0)

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = ++toastCounter.current
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const openProductDetail = useCallback((product) => setSelectedProduct(product), [])
  const closeProductDetail = useCallback(() => setSelectedProduct(null), [])

  return (
    <AppContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      cartOpen,
      openCart,
      closeCart,
      searchQuery,
      setSearchQuery,
      selectedProduct,
      openProductDetail,
      closeProductDetail,
      user,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
