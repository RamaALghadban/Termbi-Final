import { useEffect, useMemo, useRef, useState } from 'react'

import TableIllustration from '../ReservationStepsImages/Table illustration.png'
import MultyTablesIllustration from '../ReservationStepsImages/Multy tables.png'
import RestaurantIllustration from '../ReservationStepsImages/Resaurant illustration.png'
import EventIllustration from '../ReservationStepsImages/Event illustration.png'

import { DEFAULT_RESTAURANT_ADMIN_ID } from '../../../api/constants'
import { getEventTypes } from '../../../api/eventTypes'
import { createReservation } from '../../../api/reservations'
import { getRestaurantTables } from '../../../api/restaurantTables'

const types = [
  { id: 'single', title: 'Reserve a table', image: TableIllustration },
  { id: 'multi', title: 'Reserve multiple tables', image: MultyTablesIllustration },
  { id: 'all', title: 'Reserve all restaurant', image: RestaurantIllustration },
  { id: 'event', title: 'Reserve for Event', image: EventIllustration },
]

function formatDateLabel(d) {
  if (!d) return ''
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = String(d.getFullYear())
  return `${dd}/${mm}/${yyyy}`
}

function formatDateApi(d) {
  if (!d) return ''
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = String(d.getFullYear())
  return `${yyyy}-${mm}-${dd}`
}

function getMonthLabel(d) {
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function clampGuests(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return ''
  if (n < 1) return 1
  if (n > 99) return 99
  return n
}

function buildTimeSlots() {
  const slots = []
  for (let h = 8; h <= 23; h += 1) {
    for (const m of [0, 30]) {
      if (h === 23 && m === 30) {
        slots.push('23:30')
        continue
      }
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      slots.push(`${hh}:${mm}`)
    }
  }
  return slots
}

const TIME_SLOTS = buildTimeSlots()

function isSlotDisabled(slot) {
  const [hh, mm] = slot.split(':').map((x) => Number(x))
  const minutes = hh * 60 + mm
  const disabledWindows = [
    [0, 11 * 60],
    [16 * 60, 20 * 60],
  ]
  return disabledWindows.some(([a, b]) => minutes >= a && minutes < b)
}

function ReserveMultipleTables() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const [tablesOpen, setTablesOpen] = useState(false)
  const [monthCursor, setMonthCursor] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [tables, setTables] = useState('')
  const [guests, setGuests] = useState('')
  const [notes, setNotes] = useState('')
  const [tableOptions, setTableOptions] = useState([2, 3, 4, 5, 6])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const calendarRef = useRef(null)
  const timeRef = useRef(null)
  const tablesRef = useRef(null)

  const calendarDays = useMemo(() => {
    const start = startOfMonth(monthCursor)
    const end = endOfMonth(monthCursor)

    const startWeekday = start.getDay()
    const daysInMonth = end.getDate()

    const cells = []
    for (let i = 0; i < startWeekday; i += 1) cells.push(null)
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day))
    }
    return cells
  }, [monthCursor])

  const isReady = Boolean(selectedDate && selectedTime && tables && guests)

  useEffect(() => {
    let alive = true

    const run = async () => {
      try {
        const res = await getRestaurantTables({ restaurantAdminId: DEFAULT_RESTAURANT_ADMIN_ID })
        const list = Array.isArray(res?.data) ? res.data : []
        const max = Math.max(2, Math.min(10, list.length || 6))
        const opts = []
        for (let i = 2; i <= max; i += 1) opts.push(i)
        if (!alive) return
        setTableOptions(opts.length ? opts : [2, 3, 4, 5, 6])
      } catch {
        if (!alive) return
        setTableOptions([2, 3, 4, 5, 6])
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [])

  const handleSubmit = async () => {
    if (!isReady || isSubmitting) return
    try {
      setIsSubmitting(true)
      setError('')
      setSuccess('')
      await createReservation({
        restaurant_admin_id: DEFAULT_RESTAURANT_ADMIN_ID,
        type: 2,
        date: formatDateApi(selectedDate),
        from: selectedTime,
        tables,
        guests: String(guests),
        notes: notes || null,
      })
      setSuccess('Reservation submitted!')
    } catch (e) {
      setError(e?.message || 'Reservation failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-[980px] px-6 pb-16 md:px-10 lg:px-0">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Booking date</h3>
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => {
                  setCalendarOpen((v) => !v)
                  setTimeOpen(false)
                  setTablesOpen(false)
                }}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{selectedDate ? formatDateLabel(selectedDate) : 'Select Date'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {calendarOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-[280px] rounded-md border border-[#E5E7EB] bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-[#E5E7EB] text-[#6B7280]"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                    >
                      ‹
                    </button>
                    <div className="text-[12px] font-semibold text-[#111827]">{getMonthLabel(monthCursor)}</div>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-[#E5E7EB] text-[#6B7280]"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                    >
                      ›
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#9CA3AF]">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
                      <div key={d} className="py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {calendarDays.map((d, idx) => {
                      if (!d) return <div key={idx} className="h-8" />
                      const active =
                        selectedDate &&
                        d.getFullYear() === selectedDate.getFullYear() &&
                        d.getMonth() === selectedDate.getMonth() &&
                        d.getDate() === selectedDate.getDate()

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDate(d)
                            setCalendarOpen(false)
                          }}
                          className={`h-8 rounded-md text-[11px] ${
                            active ? 'bg-[#EC2323] text-white' : 'text-[#111827] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          {d.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Booking Time</h3>
            <div className="relative" ref={timeRef}>
              <button
                type="button"
                onClick={() => {
                  setTimeOpen((v) => !v)
                  setCalendarOpen(false)
                  setTablesOpen(false)
                }}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{selectedTime || 'Select Time'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {timeOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-[420px] rounded-md border border-[#E5E7EB] bg-white p-4 shadow-lg">
                  <div className="grid grid-cols-6 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const disabled = isSlotDisabled(slot)
                      const active = selectedTime === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={disabled}
                          onClick={() => {
                            setSelectedTime(slot)
                            setTimeOpen(false)
                          }}
                          className={`h-8 rounded-md border text-[11px] ${
                            disabled
                              ? 'cursor-not-allowed border-[#E5E7EB] bg-[#F3F4F6] text-[#9CA3AF]'
                              : active
                                ? 'border-[#EC2323] bg-[#EC2323] text-white'
                                : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#EC2323]'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Tables number</h3>
            <div className="relative" ref={tablesRef}>
              <button
                type="button"
                onClick={() => {
                  setTablesOpen((v) => !v)
                  setCalendarOpen(false)
                  setTimeOpen(false)
                }}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{tables ? `${tables} tables` : 'Select Number'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {tablesOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-full overflow-hidden rounded-md border border-[#E5E7EB] bg-white shadow-lg">
                  {tableOptions.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setTables(String(n))
                        setTablesOpen(false)
                      }}
                      className="flex h-10 w-full items-center px-4 text-left text-[13px] text-[#111827] hover:bg-[#F3F4F6]"
                    >
                      {n} tables
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Guests</h3>
            <input
              value={guests}
              onChange={(e) => setGuests(clampGuests(e.target.value))}
              inputMode="numeric"
              placeholder="Enter number"
              className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#111827] shadow-sm placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-[#111827]">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes, important details or special request"
            className="mt-4 h-[160px] w-full resize-none rounded-md border border-[#E5E7EB] bg-white px-4 py-3 text-[13px] text-[#111827] shadow-sm placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          disabled={!isReady || isSubmitting}
          className={`h-11 w-[220px] rounded-md text-[13px] font-semibold text-white ${
            isReady ? 'bg-[#EC2323] hover:bg-[#d81f1f]' : 'bg-[#A3A3A3]'
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting…' : 'Reserve Now'}
        </button>
      </div>

      {error && <div className="mt-4 text-center text-[12px] text-[#EC2323]">{error}</div>}
      {success && <div className="mt-4 text-center text-[12px] text-emerald-600">{success}</div>}
    </div>
  )
}

function ReserveForEvent() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [eventOpen, setEventOpen] = useState(false)
  const [decorOpen, setDecorOpen] = useState(false)
  const [monthCursor, setMonthCursor] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')
  const [eventTypeId, setEventTypeId] = useState('')
  const [decoration, setDecoration] = useState('')
  const [guests, setGuests] = useState('')
  const [notes, setNotes] = useState('')
  const [eventTypes, setEventTypes] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const calendarRef = useRef(null)
  const eventRef = useRef(null)
  const decorRef = useRef(null)

  const calendarDays = useMemo(() => {
    const start = startOfMonth(monthCursor)
    const end = endOfMonth(monthCursor)

    const startWeekday = start.getDay()
    const daysInMonth = end.getDate()

    const cells = []
    for (let i = 0; i < startWeekday; i += 1) cells.push(null)
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day))
    }
    return cells
  }, [monthCursor])

  useEffect(() => {
    let alive = true

    const run = async () => {
      try {
        const res = await getEventTypes()
        const list = Array.isArray(res?.data) ? res.data : []
        if (!alive) return
        setEventTypes(list)
      } catch {
        if (!alive) return
        setEventTypes([])
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [])

  const decorOptions = ['Wedding décor', 'Birthday décor', 'Graduation décor', 'Galaxy décor', 'Old Europe décor', 'Others']
  const isReady = Boolean(selectedDate && fromTime && toTime && eventTypeId && decoration && guests)

  const selectedEventLabel = useMemo(() => {
    const found = eventTypes.find((t) => String(t.id) === String(eventTypeId))
    return found?.name || ''
  }, [eventTypeId, eventTypes])

  const handleSubmit = async () => {
    if (!isReady || isSubmitting) return
    try {
      setIsSubmitting(true)
      setError('')
      setSuccess('')
      await createReservation({
        restaurant_admin_id: DEFAULT_RESTAURANT_ADMIN_ID,
        type: 4,
        event_type_id: Number(eventTypeId),
        decoration,
        date: formatDateApi(selectedDate),
        from: fromTime,
        to: toTime,
        guests: String(guests),
        notes: notes || null,
      })
      setSuccess('Reservation submitted!')
    } catch (e) {
      setError(e?.message || 'Reservation failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-[980px] px-6 pb-16 md:px-10 lg:px-0">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Booking date</h3>
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => {
                  setCalendarOpen((v) => !v)
                  setEventOpen(false)
                  setDecorOpen(false)
                }}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{selectedDate ? formatDateLabel(selectedDate) : 'Select Date'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {calendarOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-[280px] rounded-md border border-[#E5E7EB] bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-[#E5E7EB] text-[#6B7280]"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                    >
                      ‹
                    </button>
                    <div className="text-[12px] font-semibold text-[#111827]">{getMonthLabel(monthCursor)}</div>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-[#E5E7EB] text-[#6B7280]"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                    >
                      ›
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#9CA3AF]">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
                      <div key={d} className="py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {calendarDays.map((d, idx) => {
                      if (!d) return <div key={idx} className="h-8" />
                      const active =
                        selectedDate &&
                        d.getFullYear() === selectedDate.getFullYear() &&
                        d.getMonth() === selectedDate.getMonth() &&
                        d.getDate() === selectedDate.getDate()

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDate(d)
                            setCalendarOpen(false)
                          }}
                          className={`h-8 rounded-md text-[11px] ${
                            active ? 'bg-[#EC2323] text-white' : 'text-[#111827] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          {d.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Booking Time</h3>
            <div className="flex items-center gap-3">
              <div className="text-[12px] text-[#6B7280]">From</div>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="h-10 w-[110px] rounded-md border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] shadow-sm"
              />
              <div className="text-[12px] text-[#6B7280]">To</div>
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="h-10 w-[110px] rounded-md border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Type of event</h3>
            <div className="relative" ref={eventRef}>
              <button
                type="button"
                onClick={() => {
                  setEventOpen((v) => !v)
                  setCalendarOpen(false)
                  setDecorOpen(false)
                }}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{selectedEventLabel || 'Select Event'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {eventOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-full overflow-hidden rounded-md border border-[#E5E7EB] bg-white shadow-lg">
                  {eventTypes.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setEventTypeId(String(opt.id))
                        setEventOpen(false)
                      }}
                      className="flex h-10 w-full items-center px-4 text-left text-[13px] text-[#111827] hover:bg-[#F3F4F6]"
                    >
                      {opt.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Decoration</h3>
            <div className="relative" ref={decorRef}>
              <button
                type="button"
                onClick={() => {
                  setDecorOpen((v) => !v)
                  setCalendarOpen(false)
                  setEventOpen(false)
                }}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{decoration || 'Select decoration'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {decorOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-full overflow-hidden rounded-md border border-[#E5E7EB] bg-white shadow-lg">
                  {decorOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setDecoration(opt)
                        setDecorOpen(false)
                      }}
                      className="flex h-10 w-full items-center px-4 text-left text-[13px] text-[#111827] hover:bg-[#F3F4F6]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Guests</h3>
            <input
              value={guests}
              onChange={(e) => setGuests(clampGuests(e.target.value))}
              inputMode="numeric"
              placeholder="Enter number"
              className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#111827] shadow-sm placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-[#111827]">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes, important details or special request"
            className="mt-4 h-[160px] w-full resize-none rounded-md border border-[#E5E7EB] bg-white px-4 py-3 text-[13px] text-[#111827] shadow-sm placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          disabled={!isReady || isSubmitting}
          className={`h-11 w-[220px] rounded-md text-[13px] font-semibold text-white ${
            isReady ? 'bg-[#EC2323] hover:bg-[#d81f1f]' : 'bg-[#A3A3A3]'
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting…' : 'Reserve Now'}
        </button>
      </div>

      {error && <div className="mt-4 text-center text-[12px] text-[#EC2323]">{error}</div>}
      {success && <div className="mt-4 text-center text-[12px] text-emerald-600">{success}</div>}
    </div>
  )
}

function ReserveAllRestaurant() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [monthCursor, setMonthCursor] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')
  const [guests, setGuests] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const calendarRef = useRef(null)

  const calendarDays = useMemo(() => {
    const start = startOfMonth(monthCursor)
    const end = endOfMonth(monthCursor)

    const startWeekday = start.getDay()
    const daysInMonth = end.getDate()

    const cells = []
    for (let i = 0; i < startWeekday; i += 1) cells.push(null)
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day))
    }
    return cells
  }, [monthCursor])

  const isReady = Boolean(selectedDate && fromTime && toTime && guests)

  const handleSubmit = async () => {
    if (!isReady || isSubmitting) return
    try {
      setIsSubmitting(true)
      setError('')
      setSuccess('')
      await createReservation({
        restaurant_admin_id: DEFAULT_RESTAURANT_ADMIN_ID,
        type: 3,
        date: formatDateApi(selectedDate),
        from: fromTime,
        to: toTime,
        guests: String(guests),
        notes: notes || null,
      })
      setSuccess('Reservation submitted!')
    } catch (e) {
      setError(e?.message || 'Reservation failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-[980px] px-6 pb-16 md:px-10 lg:px-0">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Booking date</h3>
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => setCalendarOpen((v) => !v)}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{selectedDate ? formatDateLabel(selectedDate) : 'Select Date'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {calendarOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-[280px] rounded-md border border-[#E5E7EB] bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-[#E5E7EB] text-[#6B7280]"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                    >
                      ‹
                    </button>
                    <div className="text-[12px] font-semibold text-[#111827]">{getMonthLabel(monthCursor)}</div>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-[#E5E7EB] text-[#6B7280]"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                    >
                      ›
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#9CA3AF]">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
                      <div key={d} className="py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {calendarDays.map((d, idx) => {
                      if (!d) return <div key={idx} className="h-8" />
                      const active =
                        selectedDate &&
                        d.getFullYear() === selectedDate.getFullYear() &&
                        d.getMonth() === selectedDate.getMonth() &&
                        d.getDate() === selectedDate.getDate()

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDate(d)
                            setCalendarOpen(false)
                          }}
                          className={`h-8 rounded-md text-[11px] ${
                            active ? 'bg-[#EC2323] text-white' : 'text-[#111827] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          {d.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Booking Time</h3>
            <div className="flex items-center gap-3">
              <div className="text-[12px] text-[#6B7280]">From</div>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="h-10 w-[110px] rounded-md border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] shadow-sm"
              />
              <div className="text-[12px] text-[#6B7280]">To</div>
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="h-10 w-[110px] rounded-md border border-[#E5E7EB] bg-white px-3 text-[13px] text-[#111827] shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Guests</h3>
            <input
              value={guests}
              onChange={(e) => setGuests(clampGuests(e.target.value))}
              inputMode="numeric"
              placeholder="Enter number"
              className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#111827] shadow-sm placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-[#111827]">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes, important details or special request"
            className="mt-4 h-[160px] w-full resize-none rounded-md border border-[#E5E7EB] bg-white px-4 py-3 text-[13px] text-[#111827] shadow-sm placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          disabled={!isReady || isSubmitting}
          className={`h-11 w-[220px] rounded-md text-[13px] font-semibold text-white ${
            isReady ? 'bg-[#EC2323] hover:bg-[#d81f1f]' : 'bg-[#A3A3A3]'
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting…' : 'Reserve Now'}
        </button>
      </div>

      {error && <div className="mt-4 text-center text-[12px] text-[#EC2323]">{error}</div>}
    </div>
  )
}

function ReserveSingleTable() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const [monthCursor, setMonthCursor] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [guests, setGuests] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const calendarRef = useRef(null)
  const timeRef = useRef(null)

  const calendarDays = useMemo(() => {
    const start = startOfMonth(monthCursor)
    const end = endOfMonth(monthCursor)

    const startWeekday = start.getDay()
    const daysInMonth = end.getDate()

    const cells = []
    for (let i = 0; i < startWeekday; i += 1) cells.push(null)
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day))
    }
    return cells
  }, [monthCursor])

  const isReady = Boolean(selectedDate && selectedTime && guests)

  const handleSubmit = async () => {
    if (!isReady || isSubmitting) return
    try {
      setIsSubmitting(true)
      setError('')
      await createReservation({
        restaurant_admin_id: DEFAULT_RESTAURANT_ADMIN_ID,
        type: 1,
        date: formatDateApi(selectedDate),
        from: selectedTime,
        guests: String(guests),
        notes: notes || null,
      })
      window.alert('Reservation submitted!')
    } catch (e) {
      setError(e?.message || 'Reservation failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-[980px] px-6 pb-16 md:px-10 lg:px-0">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Booking date</h3>
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => {
                  setCalendarOpen((v) => !v)
                  setTimeOpen(false)
                }}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{selectedDate ? formatDateLabel(selectedDate) : 'Select Date'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {calendarOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-[280px] rounded-md border border-[#E5E7EB] bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-[#E5E7EB] text-[#6B7280]"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                    >
                      ‹
                    </button>
                    <div className="text-[12px] font-semibold text-[#111827]">{getMonthLabel(monthCursor)}</div>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-md border border-[#E5E7EB] text-[#6B7280]"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                    >
                      ›
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#9CA3AF]">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
                      <div key={d} className="py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {calendarDays.map((d, idx) => {
                      if (!d) return <div key={idx} className="h-8" />
                      const active =
                        selectedDate &&
                        d.getFullYear() === selectedDate.getFullYear() &&
                        d.getMonth() === selectedDate.getMonth() &&
                        d.getDate() === selectedDate.getDate()

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDate(d)
                            setCalendarOpen(false)
                          }}
                          className={`h-8 rounded-md text-[11px] ${
                            active ? 'bg-[#EC2323] text-white' : 'text-[#111827] hover:bg-[#F3F4F6]'
                          }`}
                        >
                          {d.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Booking Time</h3>
            <div className="relative" ref={timeRef}>
              <button
                type="button"
                onClick={() => {
                  setTimeOpen((v) => !v)
                  setCalendarOpen(false)
                }}
                className="flex h-11 w-full items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#6B7280] shadow-sm"
              >
                <span>{selectedTime || 'Select Time'}</span>
                <span className="text-[#9CA3AF]">˅</span>
              </button>

              {timeOpen && (
                <div className="absolute left-0 top-[52px] z-20 w-[420px] rounded-md border border-[#E5E7EB] bg-white p-4 shadow-lg">
                  <div className="grid grid-cols-6 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const disabled = isSlotDisabled(slot)
                      const active = selectedTime === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={disabled}
                          onClick={() => {
                            setSelectedTime(slot)
                            setTimeOpen(false)
                          }}
                          className={`h-8 rounded-md border text-[11px] ${
                            disabled
                              ? 'cursor-not-allowed border-[#E5E7EB] bg-[#F3F4F6] text-[#9CA3AF]'
                              : active
                                ? 'border-[#EC2323] bg-[#EC2323] text-white'
                                : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#EC2323]'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <h3 className="text-[16px] font-semibold text-[#111827]">Guests</h3>
            <input
              value={guests}
              onChange={(e) => setGuests(clampGuests(e.target.value))}
              inputMode="numeric"
              placeholder="Enter number"
              className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] text-[#111827] shadow-sm placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-[#111827]">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes, important details or special request"
            className="mt-4 h-[160px] w-full resize-none rounded-md border border-[#E5E7EB] bg-white px-4 py-3 text-[13px] text-[#111827] shadow-sm placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          disabled={!isReady || isSubmitting}
          className={`h-11 w-[220px] rounded-md text-[13px] font-semibold text-white ${
            isReady ? 'bg-[#EC2323] hover:bg-[#d81f1f]' : 'bg-[#A3A3A3]'
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting…' : 'Reserve Now'}
        </button>
      </div>

      {error && <div className="mt-4 text-center text-[12px] text-[#EC2323]">{error}</div>}
    </div>
  )
}

function ComingSoon({ title }) {
  return (
    <div className="mx-auto mt-10 w-full max-w-[980px] px-6 pb-16 text-center text-[14px] text-[#6B7280] md:px-10 lg:px-0">
      {title} steps will be implemented after you provide the design images.
    </div>
  )
}

function ReserveDetails() {
  const [activeType, setActiveType] = useState('single')

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 md:px-10 lg:px-[0px]">
        <h2 className="text-[22px] font-semibold">
          <span className="text-[#EC2323]">Reserve</span> Details
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((t) => {
            const active = activeType === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveType(t.id)}
                className={`flex flex-col items-center justify-center rounded-md border bg-white p-4 shadow-sm transition-colors ${
                  active ? 'border-[#EC2323]' : 'border-[#F3F4F6] hover:border-[#E5E7EB]'
                }`}
              >
                <div className="text-[12px] font-medium text-[#111827]">{t.title}</div>
                <img src={t.image} alt={t.title} className="mt-4 h-[120px] w-auto object-contain" />
              </button>
            )
          })}
        </div>
      </div>

      {activeType === 'single' && <ReserveSingleTable />}
      {activeType === 'multi' && <ReserveMultipleTables />}
      {activeType === 'all' && <ReserveAllRestaurant />}
      {activeType === 'event' && <ReserveForEvent />}
    </section>
  )
}

export default ReserveDetails
