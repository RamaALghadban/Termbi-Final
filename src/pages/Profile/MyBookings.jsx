import { useEffect, useState } from 'react'

import ProfileLayout from './ProfileLayout'
import { DEFAULT_RESTAURANT_ADMIN_ID } from '../../api/constants'
import { getReservations } from '../../api/reservations'

function statusClass(status) {
  if (status === 'Confirmed') return 'text-emerald-500'
  return 'text-[#9CA3AF]'
}

function MyBookings() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true

    const run = async () => {
      try {
        setIsLoading(true)
        setError('')
        const res = await getReservations({ restaurantAdminId: DEFAULT_RESTAURANT_ADMIN_ID })
        const list = Array.isArray(res?.data) ? res.data : []
        if (!alive) return
        setRows(list)
      } catch (e) {
        if (!alive) return
        setError(e?.message || 'Failed to load bookings')
      } finally {
        if (!alive) return
        setIsLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [])

  return (
    <ProfileLayout activeId="bookings" crumb="My bookings" title="My bookings">
      <div className="overflow-hidden rounded-lg border border-[#F3F4F6]">
        <div className="grid grid-cols-[160px_140px_120px_120px_140px_120px] bg-[#FAFAFA] px-6 py-3 text-[12px] font-medium text-[#6B7280]">
          <div>Booking ID</div>
          <div>Date</div>
          <div>Time</div>
          <div>Guests</div>
          <div>Status</div>
          <div>Details</div>
        </div>
        {isLoading && (
          <div className="px-6 py-6 text-[12px] text-[#6B7280]">Loading…</div>
        )}

        {!isLoading && error && <div className="px-6 py-6 text-[12px] text-[#EC2323]">{error}</div>}

        {!isLoading && !error && rows.map((r, idx) => (
          <div
            key={`${r.id || idx}-${idx}`}
            className="grid grid-cols-[160px_140px_120px_120px_140px_120px] items-center px-6 py-6 text-[12px]"
          >
            <div className="text-[#9CA3AF]">{r.id}</div>
            <div className="text-[#9CA3AF]">{r.date || '-'}</div>
            <div>{r.from || r.time || '-'}</div>
            <div>{r.guests ?? '-'}</div>
            <div className={statusClass(r.status || r.state || '')}>{r.status || r.state || '-'}</div>
            <button type="button" className="text-[#EC2323]">View details</button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button type="button" className="h-7 w-7 rounded-sm bg-[#EC2323] text-[12px] text-white">
          1
        </button>
        <button type="button" className="h-7 w-7 rounded-sm border border-[#E5E7EB] text-[12px] text-[#6B7280]">
          2
        </button>
        <button type="button" className="h-7 w-7 rounded-sm border border-[#E5E7EB] text-[12px] text-[#6B7280]">
          3
        </button>
      </div>
    </ProfileLayout>
  )
}

export default MyBookings
