import { useNavigate } from 'react-router-dom'

import NavBar from '../../components/SharedComp/NavBar/NavBar'
import Footer from '../../components/SharedComp/Footer/Footer'
import { clearStoredToken } from '../../api/config'

const NAV_ITEMS = [
  { id: 'manage', label: 'Manage Profile', path: '/profile/manage' },
  { id: 'orders', label: 'My Order', path: '/profile/orders' },
  { id: 'bookings', label: 'My bookings', path: '/profile/bookings' },
  { id: 'reviews', label: 'My Reviews', path: '/profile/reviews' },
]

function ProfileLayout({ activeId, crumb, title, children }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    const ok = window.confirm('Are you sure you want to log out?')
    if (!ok) return

    try {
      localStorage.setItem('termby_auth', 'false')
      localStorage.setItem('termby_role', '')
    } catch {
    }

    clearStoredToken()

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('termby:auth-changed', { detail: { isAuthenticated: false, role: '' } }))
    }

    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <NavBar />
      <main className="pt-[72px]">
        <div className="bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1200px] px-6 py-5 md:px-10 lg:px-0">
            <div className="text-[12px] text-[#9CA3AF]">
              <button type="button" className="hover:text-[#EC2323]" onClick={() => navigate('/')}
              >
                Home
              </button>
              <span className="px-2">›</span>
              <span>My Profile</span>
              <span className="px-2">›</span>
              <span className="text-[#111827]">{crumb}</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 lg:px-0">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="rounded-xl border border-[#F3F4F6] bg-white shadow-sm">
              <div className="flex flex-col items-center px-6 py-8">
                <div className="h-20 w-20 overflow-hidden rounded-full bg-[#E5E7EB]" />
                <div className="mt-4 text-[14px] font-semibold">Ahmad AL-Ahmad</div>
              </div>
              <div className="h-px bg-[#F3F4F6]" />
              <div className="py-2">
                {NAV_ITEMS.map((item) => {
                  const active = item.id === activeId
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`flex h-11 w-full items-center gap-3 px-6 text-[13px] ${
                        active ? 'bg-[#FEF2F2] text-[#111827]' : 'text-[#374151] hover:bg-[#FAFAFA]'
                      }`}
                      onClick={() => {
                        navigate(item.path)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      <span className="h-4 w-4 text-[#9CA3AF]">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M4 6.5h16M4 12h16M4 17.5h16"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      {item.label}
                    </button>
                  )
                })}
              </div>
              <div className="px-6">
                <div className="my-4 h-px bg-[#F3F4F6]" />
              </div>
              <div className="px-6 pb-6">
                <button
                  type="button"
                  className="flex h-11 w-full items-center gap-3 text-[13px] text-[#374151] hover:text-[#EC2323]"
                  onClick={handleLogout}
                >
                  <span className="h-4 w-4 text-[#9CA3AF]">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 4h4v16h-4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 17l5-5-5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12H4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Log out
                </button>
              </div>
            </aside>

            <section className="rounded-xl border border-[#F3F4F6] bg-white p-8 shadow-sm">
              <h1 className="text-[18px] font-semibold">{title}</h1>
              <div className="mt-6">{children}</div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProfileLayout
