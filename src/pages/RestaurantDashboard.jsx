import NavBar from '../components/SharedComp/NavBar/NavBar'
import Footer from '../components/SharedComp/Footer/Footer'

function RestaurantDashboard() {
  const stats = [
    { label: "Today's Orders", value: '24', delta: '+12%', tone: 'rose' },
    { label: "Today's Reservations", value: '9', delta: '+5%', tone: 'amber' },
    { label: "Today's Revenue", value: '$486', delta: '+18%', tone: 'emerald' },
    { label: 'Average Rating', value: '4.6', delta: '+0.2', tone: 'indigo' },
  ]

  const favorites = [
    {
      name: 'Watermelon Juice with Mint',
      orders: 244,
      rating: 4.8,
      progress: 75,
      price: '$5.67',
      accent: '#EC2323',
    },
    {
      name: 'Orange Juice Special Smoothy',
      orders: 188,
      rating: 4.6,
      progress: 57,
      price: '$4.25',
      accent: '#EC2323',
    },
    {
      name: 'Mozzarella Pizza with Toppings',
      orders: 312,
      rating: 4.7,
      progress: 68,
      price: '$9.20',
      accent: '#EC2323',
    },
    {
      name: 'Chicken Kebab with Garlic Sauce',
      orders: 205,
      rating: 4.5,
      progress: 43,
      price: '$7.80',
      accent: '#EC2323',
    },
  ]

  const trending = [
    { name: 'Medium Spicy Spaghetti', price: '$5.6', orders: 24 },
    { name: 'Watermelon Juice', price: '$3.5', orders: 18 },
    { name: 'Chicken Curry Special', price: '$6.9', orders: 14 },
    { name: 'Italian Pizza', price: '$8.2', orders: 12 },
    { name: 'Fresh Shrimp Salad', price: '$7.1', orders: 9 },
  ]

  const quickActions = [
    { title: 'Add Menu Item', desc: 'Create a new product and publish it to your menu.' },
    { title: 'Review Reservations', desc: 'Confirm, reschedule, or mark arrivals.' },
    { title: 'Reply to Reviews', desc: 'Boost trust by responding to customer feedback.' },
  ]

  const badgeTone = (tone) => {
    if (tone === 'rose') return 'bg-[#FDF2F2] text-[#B91C1C] border-[#FECACA]'
    if (tone === 'amber') return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
    if (tone === 'emerald') return 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
    return 'bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]'
  }

  return (
    <div className="min-h-screen bg-[#F7F8FB] text-[#111827]">
      <NavBar />
      <main className="min-h-[calc(100vh-72px)] pt-[72px]">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEC] text-[#EC2323]">
                  <span className="text-[14px] font-semibold">T</span>
                </div>
                <div>
                  <div className="text-[16px] font-semibold">Termbi</div>
                  <div className="text-[12px] text-[#6B7280]">Restaurant Admin Dashboard</div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button type="button" className="flex w-full items-center gap-3 rounded-xl bg-[#FDECEC] px-4 py-3 text-left text-[13px] font-semibold text-[#EC2323]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#EC2323]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 13h7V4H4v9Z" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M13 20h7V11h-7v9Z" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M13 9h7V4h-7v5Z" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M4 20h7v-5H4v5Z" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </span>
                  Dashboard
                </button>

                {[
                  { label: 'Orders', icon: 'orders' },
                  { label: 'Menu', icon: 'menu' },
                  { label: 'Reservations', icon: 'calendar' },
                  { label: 'Reviews', icon: 'star' },
                  { label: 'Customers', icon: 'users' },
                  { label: 'Settings', icon: 'settings' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[13px] font-medium text-[#374151] hover:bg-[#F9FAFB]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
                      {item.icon === 'orders' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 4h10v16H7V4Z" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M9 8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      )}
                      {item.icon === 'menu' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M6 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      )}
                      {item.icon === 'calendar' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M17 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M4 8h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      )}
                      {item.icon === 'star' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="m12 3 2.7 5.6 6.3.9-4.5 4.3 1.1 6.2L12 17.8 6.4 20l1.1-6.2L3 9.5l6.3-.9L12 3Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {item.icon === 'users' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M22 21v-2a3 3 0 0 0-2.2-2.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M16.8 3.1a4 4 0 0 1 0 7.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      )}
                      {item.icon === 'settings' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M19.4 15a7.9 7.9 0 0 0 .1-1l2-1.5-2-3.4-2.4.7a7.7 7.7 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5c-.6.2-1.2.6-1.7 1L4.5 9.1l-2 3.4 2 1.5a7.9 7.9 0 0 0 0 2l-2 1.5 2 3.4 2.4-.7c.5.4 1.1.7 1.7 1l.4 2.5h4l.4-2.5c.6-.2 1.2-.6 1.7-1l2.4.7 2-3.4-2-1.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#F3F4F6] bg-[#FAFAFA] p-4">
                <div className="text-[13px] font-semibold">Quick tips</div>
                <div className="mt-1 text-[12px] leading-5 text-[#6B7280]">
                  Keep your menu up to date and respond to reviews to increase conversions.
                </div>
                <button type="button" className="mt-4 h-9 w-full rounded-xl bg-[#EC2323] text-[12px] font-semibold text-white hover:bg-[#d81f1f]">
                  Add Menu Items
                </button>
              </div>
            </aside>

            <section className="space-y-6">
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-[18px] font-semibold">Analytics</div>
                    <div className="mt-1 text-[12px] text-[#6B7280]">Here is your restaurant summary with quick insights.</div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search orders, menus, customers..."
                        className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-4 text-[12px] text-[#111827] outline-none focus:border-[#EC2323] sm:w-[320px]"
                      />
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
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

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
                        aria-label="Notifications"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.7 21a2 2 0 0 1-3.4 0"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] px-3 py-2">
                        <div className="h-8 w-8 rounded-full bg-[#F3F4F6]" />
                        <div className="hidden sm:block">
                          <div className="text-[12px] font-semibold">Restaurant Owner</div>
                          <div className="text-[11px] text-[#6B7280]">admin</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[12px] font-medium text-[#6B7280]">{s.label}</div>
                        <div className="mt-2 text-[24px] font-semibold text-[#111827]">{s.value}</div>
                      </div>
                      <div className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${badgeTone(s.tone)}`}>{s.delta}</div>
                    </div>
                    <div className="mt-4 h-[8px] w-full overflow-hidden rounded-full bg-[#F3F4F6]">
                      <div
                        className="h-full rounded-full bg-[#EC2323]"
                        style={{ width: s.label.includes('Rating') ? '70%' : s.label.includes('Revenue') ? '62%' : '55%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-[14px] font-semibold">Most Favorite Items</div>
                      <div className="mt-1 text-[12px] text-[#6B7280]">Top items by orders & customer rating</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {['All', 'Main Course', 'Pizza', 'Drinks', 'Dessert'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`h-9 rounded-xl border px-4 text-[12px] font-medium ${
                            t === 'All' ? 'border-[#FDECEC] bg-[#FDECEC] text-[#EC2323]' : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {favorites.map((item) => (
                      <div key={item.name} className="rounded-2xl border border-[#F3F4F6] bg-white p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-[64px] w-[64px] rounded-2xl bg-[#FDECEC]" />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] font-semibold text-[#111827]">{item.name}</div>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-[#6B7280]">
                              <span className="flex items-center gap-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="m12 3 2.7 5.6 6.3.9-4.5 4.3 1.1 6.2L12 17.8 6.4 20l1.1-6.2L3 9.5l6.3-.9L12 3Z"
                                    fill="#F59E0B"
                                  />
                                </svg>
                                {item.rating}
                              </span>
                              <span>{item.orders} orders</span>
                              <span className="font-semibold text-[#EC2323]">{item.price}</span>
                            </div>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F3F4F6] bg-white text-[11px] font-semibold text-[#111827]">
                            {item.progress}%
                          </div>
                        </div>
                        <div className="mt-4 h-[8px] w-full overflow-hidden rounded-full bg-[#F3F4F6]">
                          <div className="h-full rounded-full" style={{ width: `${item.progress}%`, backgroundColor: item.accent }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[14px] font-semibold">Daily Trending Menus</div>
                      <div className="mt-1 text-[12px] text-[#6B7280]">Best sellers for today</div>
                    </div>
                    <button type="button" className="h-9 rounded-xl border border-[#E5E7EB] px-4 text-[12px] font-medium text-[#6B7280] hover:text-[#111827]">
                      Filter
                    </button>
                  </div>

                  <div className="mt-5 space-y-3">
                    {trending.map((t) => (
                      <div key={t.name} className="flex items-center gap-3 rounded-2xl border border-[#F3F4F6] bg-white p-3">
                        <div className="h-12 w-12 rounded-2xl bg-[#F3F4F6]" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[12px] font-semibold text-[#111827]">{t.name}</div>
                          <div className="mt-1 text-[11px] text-[#6B7280]">{t.price} · {t.orders} orders</div>
                        </div>
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
                          aria-label="View details"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18 15 12 9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {quickActions.map((a) => (
                  <div key={a.title} className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="text-[13px] font-semibold">{a.title}</div>
                    <div className="mt-2 text-[12px] leading-5 text-[#6B7280]">{a.desc}</div>
                    <button type="button" className="mt-4 h-9 rounded-xl border border-[#FDECEC] bg-[#FDECEC] px-4 text-[12px] font-semibold text-[#EC2323] hover:bg-[#FBDADA]">
                      Open
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RestaurantDashboard
