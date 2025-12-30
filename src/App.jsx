import './App.css'
import { useEffect, useState } from 'react'
import MainHomePage from './components/MainHomePage/MainHomePage'
import LoggedInHomePage from './pages/LoggedInHomePage/LoggedInHomePage'
import RegistrationStep1 from './pages/RegistrationStep1'
import CustomerRegisterSteps from './pages/CustomerRegisterSteps/CustomerRegisterSteps'
import ContactUs from './pages/ContactUs/ContactUs'
import ReservationSteps from './pages/ReservationSteps/ReservationSteps'
import ManageProfile from './pages/Profile/ManageProfile'
import MyOrders from './pages/Profile/MyOrders'
import MyBookings from './pages/Profile/MyBookings'
import MyReviews from './pages/Profile/MyReviews'
import RestaurantDashboard from './pages/RestaurantDashboard'
import LoginModal from './components/SharedComp/Modals/LoginModal'
import SignUpChoiceModal from './components/SharedComp/Modals/SignUpChoiceModal'
import { Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const [activePopup, setActivePopup] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('termby_auth') === 'true'
    } catch {
      return false
    }
  })
  const [role, setRole] = useState(() => {
    try {
      return localStorage.getItem('termby_role') || ''
    } catch {
      return ''
    }
  })
  const navigate = useNavigate()

  useEffect(() => {
    const onOpenLogin = () => setActivePopup('login')
    window.addEventListener('termby:open-login', onOpenLogin)
    return () => window.removeEventListener('termby:open-login', onOpenLogin)
  }, [])

  useEffect(() => {
    const onAuthChanged = (e) => {
      if (e?.detail?.isAuthenticated === true || e?.detail?.isAuthenticated === false) {
        setIsAuthenticated(e.detail.isAuthenticated)
        if (typeof e?.detail?.role === 'string') setRole(e.detail.role)
        return
      }

      try {
        setIsAuthenticated(localStorage.getItem('termby_auth') === 'true')
        setRole(localStorage.getItem('termby_role') || '')
      } catch {
      }
    }

    window.addEventListener('termby:auth-changed', onAuthChanged)
    return () => window.removeEventListener('termby:auth-changed', onAuthChanged)
  }, [])

  const isCustomer = isAuthenticated && role === 'customer'

  return (
    <>
      <Routes>
        <Route path="/" element={isCustomer ? <LoggedInHomePage /> : <MainHomePage />} />
        <Route path="/register/owner" element={<RegistrationStep1 />} />
        <Route path="/register/customer" element={<CustomerRegisterSteps />} />
        <Route path="/dashboard/restaurant" element={<RestaurantDashboard />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/reserve" element={<ReservationSteps />} />
        <Route path="/profile" element={<ManageProfile />} />
        <Route path="/profile/manage" element={<ManageProfile />} />
        <Route path="/profile/orders" element={<MyOrders />} />
        <Route path="/profile/bookings" element={<MyBookings />} />
        <Route path="/profile/reviews" element={<MyReviews />} />
      </Routes>

      <LoginModal
        isOpen={activePopup === 'login'}
        onClose={() => setActivePopup(null)}
        onOpenSignUp={() => setActivePopup('signupChoice')}
        onSuccess={() => {
          setActivePopup(null)
          setIsAuthenticated(true)
          setRole('customer')
          try {
            localStorage.setItem('termby_auth', 'true')
            localStorage.setItem('termby_role', 'customer')
          } catch {
          }
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('termby:auth-changed', { detail: { isAuthenticated: true, role: 'customer' } }),
            )
          }
        }}
      />

      <SignUpChoiceModal
        isOpen={activePopup === 'signupChoice'}
        onClose={() => setActivePopup(null)}
        onChoose={(type) => {
          setActivePopup(null)
          if (type === 'owner') {
            setIsAuthenticated(true)
            setRole('owner')
            try {
              localStorage.setItem('termby_auth', 'true')
              localStorage.setItem('termby_role', 'owner')
            } catch {
            }
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('termby:auth-changed', { detail: { isAuthenticated: true, role: 'owner' } }))
            }
            navigate('/register/owner')
            return
          }

          navigate('/register/customer')
        }}
      />
    </>
  )
}

export default App
