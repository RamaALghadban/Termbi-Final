import Border1 from './MainHomePageImages/Border (1).png'
import Border2 from './MainHomePageImages/Border (2).png'
import Border3 from './MainHomePageImages/Border (3).png'
import Border4 from './MainHomePageImages/Border (4).png'
import BorderMain from './MainHomePageImages/Border.png'
import { useMemo, useState } from 'react'

function TrustedRestaurantsSection() {
  const restaurants = useMemo(
    () => [
      { id: 1, name: 'Restaurant One', logo: Border1, location: 'Damascus', note: 'Trusted partner' },
      { id: 2, name: 'Restaurant Two', logo: Border2, location: 'Aleppo', note: 'Popular choice' },
      { id: 3, name: 'Restaurant Three', logo: Border3, location: 'Homs', note: 'Top rated' },
      { id: 4, name: 'Restaurant Four', logo: Border4, location: 'Latakia', note: 'Great service' },
      { id: 5, name: 'Restaurant Five', logo: BorderMain, location: 'Tartus', note: 'Featured restaurant' },
    ],
    [],
  )

  const [activeRestaurant, setActiveRestaurant] = useState(null)

  return (
    <section className="bg-white px-4 py-24 md:px-16">
      <div className="mx-auto max-w-[1556px] text-center">
        <h3
          className="mb-8 text-[48px] font-normal leading-[100%] text-[#272727]"
          style={{
            fontFamily:
              '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          restaurants already trust in <span className="text-[#F03331]">termbi</span>
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {restaurants.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveRestaurant(r)}
              className="group flex h-[260px] w-[260px] items-center justify-center rounded-xl bg-white p-10 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
              aria-label={`Open ${r.name}`}
            >
              <img src={r.logo} alt={r.name} className="max-h-full max-w-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      {activeRestaurant && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveRestaurant(null)}
        >
          <div
            className="w-full max-w-[520px] rounded-xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[16px] font-semibold text-[#111827]">{activeRestaurant.name}</div>
                <div className="mt-1 text-[12px] text-[#6B7280]">{activeRestaurant.location}</div>
              </div>
              <button
                type="button"
                onClick={() => setActiveRestaurant(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] hover:bg-gray-100"
                aria-label="Close"
              >
                <span className="text-xl leading-none">×</span>
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-lg bg-[#FFF6F6] p-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-white">
                <img src={activeRestaurant.logo} alt={activeRestaurant.name} className="h-full w-full object-contain" />
              </div>
              <div className="text-[12px] text-[#374151]">
                <div className="font-medium">{activeRestaurant.note}</div>
                <div className="mt-1 text-[#6B7280]">Click “Try Now” to log in and explore restaurants.</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="h-10 rounded-md bg-[#EC2323] px-5 text-[13px] font-semibold text-white hover:bg-[#d32f2f]"
                onClick={() => {
                  setActiveRestaurant(null)
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('termby:open-login'))
                  }
                }}
              >
                Log in to continue
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default TrustedRestaurantsSection
