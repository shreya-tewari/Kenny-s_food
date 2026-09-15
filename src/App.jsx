import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AppProvider, useApp } from './context/AppContext'

// Layout
import Header from './components/Header'
import Footer from './components/Footer'
import ShoppingCart from './components/ShoppingCart'
import ProductDetail from './components/ProductDetail'

// Pages
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmation from './components/OrderConfirmation'
import OrderTracking from './components/OrderTracking'
import UserAccount from './components/UserAccount/UserAccount'

import ScrollToTop from './components/ScrollToTop'

// Toast system
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

function ToastContainer() {
  const { toasts, removeToast } = useApp()

  const icons = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
    warning: <AlertTriangle size={18} />,
  }

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">{icons[toast.type] || icons.info}</span>
          <span className="toast-message">{toast.message}</span>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="page-wrapper">
        <Routes>
          <Route path="/"                    element={<HomePage />} />
          <Route path="/checkout"            element={<CheckoutPage />} />
          <Route path="/order-confirmation"  element={<OrderConfirmation />} />
          <Route path="/tracking"            element={<OrderTracking />} />
          <Route path="/account"             element={<UserAccount />} />
          {/* Fallback */}
          <Route path="*"                    element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
      <ShoppingCart />
      <ProductDetail />
      <ToastContainer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppProvider>
          <AppShell />
        </AppProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
