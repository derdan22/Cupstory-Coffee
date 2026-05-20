import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { CartDrawer } from './components/cart/CartDrawer'
import { FloatingCart } from './components/cart/FloatingCart'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
      <main className="safe-x min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <FloatingCart />
    </BrowserRouter>
  )
}

export default App
