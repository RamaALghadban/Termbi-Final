 
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from './NavBarImages/Logo.svg'
import UsaFlag from './NavBarImages/usa 1.svg'
import FrFlag from './NavBarImages/fr.svg'
import ArFlag from './NavBarImages/ar.svg'
import ArrowIcon from './NavBarImages/Arrow.svg'
import { clearStoredToken } from '../../../api/config'

function NavBar({ onLoginClick }) {
  const navigate = useNavigate()
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
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('termby_lang') || 'en'
    } catch {
      return 'en'
    }
  })
  const langMenuRef = useRef(null)
  const profileMenuRef = useRef(null)

  const languages = {
    en: { label: 'EN', flag: UsaFlag, flagAlt: 'English' },
    fr: { label: 'FR', flag: FrFlag, flagAlt: 'Français' },
    ar: { label: 'AR', flag: ArFlag, flagAlt: 'العربية' },
  }

  useEffect(() => {
    document.documentElement.lang = lang

    try {
      localStorage.setItem('termby_lang', lang)
    } catch {
    }
  }, [lang])

  useEffect(() => {
    const onPointerDown = (e) => {
      if (!langMenuRef.current) return
      if (!langMenuRef.current.contains(e.target)) setIsLangOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [])

  const isCustomer = isAuthenticated && role === 'customer'

  useEffect(() => {
    const onPointerDown = (e) => {
      if (!profileMenuRef.current) return
      if (!profileMenuRef.current.contains(e.target)) setIsProfileOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
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

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick()
      return
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('termby:open-login'))
    }
  }

  const handleLogout = () => {
    const ok = window.confirm('Are you sure you want to log out?')
    if (!ok) return

    try {
      localStorage.setItem('termby_auth', 'false')
      localStorage.setItem('termby_role', '')
    } catch {
    }

    clearStoredToken()
    setIsAuthenticated(false)
    setRole('')
    setIsProfileOpen(false)

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('termby:auth-changed', { detail: { isAuthenticated: false, role: '' } }))
    }

    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 z-50 flex h-[72px] w-full items-center bg-[#272727] px-6 text-white md:px-10 lg:px-[120px]">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex items-center"
          onClick={() => {
            navigate('/')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="Go to home"
        >
          <img src={Logo} alt="Termbi" className="h-8 w-[143px]" />
        </button>

        {isCustomer && (
        <div className="hidden md:flex">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="h-10 w-[320px] rounded-lg border border-white/10 bg-[#1f1f1f] px-4 pr-10 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        )}
      </div>
      <nav
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 items-center md:flex"
        style={{ fontFamily: '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
      >
        <div className="pointer-events-auto flex items-center gap-10 text-center text-[20px] font-normal">
          <button type="button" onClick={() => navigate('/')} className="leading-[90px] text-white/90 hover:text-[#EC2323]">
            Home
          </button>
          <button className="leading-[90px] text-white/90 hover:text-[#EC2323]">Services</button>
          <button className="leading-[90px] text-white/90 hover:text-[#EC2323]">About us</button>
          <button type="button" onClick={() => navigate('/contact')} className="leading-[90px] text-white/90 hover:text-[#EC2323]">
            Contact us
          </button>
        </div>
      </nav>

      <div className="ml-auto flex items-center gap-4">
        {isCustomer && (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 hover:text-white"
            aria-label="Cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 7h15l-1.5 8.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.6L5 3H2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
              <path d="M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
            </svg>
          </button>
        )}

        <div className="relative" ref={langMenuRef}>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-white/90 hover:text-white"
            onClick={() => setIsLangOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={isLangOpen}
          >
            {languages[lang].flag ? (
              <img src={languages[lang].flag} alt={languages[lang].flagAlt ?? lang} className="h-4 w-5 object-cover" />
            ) : (
              <span className="text-base leading-none">{languages[lang].emojiFlag}</span>
            )}
            <span className="uppercase">{languages[lang].label}</span>
            <img src={ArrowIcon} alt="Toggle language" className="h-2.5 w-2.5 opacity-90" />
          </button>

          {isLangOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-[140px] overflow-hidden rounded-md border border-white/10 bg-[#1f1f1f] shadow-lg"
            >
              {Object.entries(languages).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-white/90 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    setLang(key)
                    setIsLangOpen(false)
                  }}
                >
                  {value.flag ? (
                    <img src={value.flag} alt={value.flagAlt ?? key} className="h-4 w-5 object-cover" />
                  ) : (
                    <span className="text-base leading-none">{value.emojiFlag}</span>
                  )}
                  <span className="uppercase">{value.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {isCustomer ? (
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/90 hover:border-white/40 hover:bg-white/10 hover:text-white"
              aria-label="Profile"
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              onClick={() => setIsProfileOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 21a8 8 0 1 0-16 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-[180px] overflow-hidden rounded-md border border-white/10 bg-[#1f1f1f] shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-white/90 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    setIsProfileOpen(false)
                    navigate('/profile/manage')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-white/90 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    setIsProfileOpen(false)
                    navigate('/profile/orders')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Orders
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-white/90 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    setIsProfileOpen(false)
                    navigate('/profile/manage')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Settings
                </button>

                <div className="h-px bg-white/10" />

                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-white/90 hover:bg-[#EC2323] hover:text-white"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleLoginClick}
            className="flex h-10 w-[140px] items-center justify-center rounded-lg border border-white/60 text-[14px] font-medium text-white hover:border-[#EC2323] hover:bg-[#EC2323] hover:text-white md:h-11 md:w-[164px]"
          >
            Log in
          </button>
        )}
      </div>
    </header>
  )
}

export default NavBar

