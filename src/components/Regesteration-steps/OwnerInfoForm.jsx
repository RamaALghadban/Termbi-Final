import UsaFlag from './Regesteration-steps-Image/usa 1.svg'

function OwnerInfoForm({ value, onChange, errors }) {
  const ownerName = value?.ownerName ?? ''
  const ownerEmail = value?.ownerEmail ?? ''
  const ownerPhone = value?.ownerPhone ?? ''

  const setOwnerName = onChange?.setOwnerName
  const setOwnerEmail = onChange?.setOwnerEmail
  const setOwnerPhone = onChange?.setOwnerPhone

  const e = errors ?? {}

  return (
    <>
      <h1 className="mb-8 text-center text-[18px] font-semibold text-[#111827] md:text-[20px]">Tell us about yourself</h1>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="block text-[12px] font-medium text-[#111827]">
            Your name <span className="text-[#F03331]">*</span>
          </label>
          <input
            type="text"
            className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:border-[#F03331]"
            value={ownerName}
            onChange={(ev) => setOwnerName?.(ev.target.value)}
          />
          {e.ownerName && <p className="text-[11px] text-[#B91C1C]">{e.ownerName}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-[12px] font-medium text-[#111827]">
            Your email <span className="text-[#F03331]">*</span>
          </label>
          <input
            type="email"
            className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:border-[#F03331]"
            value={ownerEmail}
            onChange={(ev) => setOwnerEmail?.(ev.target.value)}
          />
          {e.ownerEmail && <p className="text-[11px] text-[#B91C1C]">{e.ownerEmail}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-[12px] font-medium text-[#111827]">
            Your phone <span className="text-[#F03331]">*</span>
          </label>
          <div className="flex h-11 w-full overflow-hidden rounded-md border border-[#E5E7EB] bg-white">
            <div className="flex items-center gap-2 border-r border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm">
              <img src={UsaFlag} alt="USA" className="h-4 w-6 object-cover" />
              <span className="text-[#111827]">+1</span>
            </div>
            <input
              type="tel"
              className="flex-1 px-4 text-sm outline-none"
              value={ownerPhone}
              onChange={(ev) => setOwnerPhone?.(ev.target.value)}
            />
          </div>
          {e.ownerPhone && <p className="text-[11px] text-[#B91C1C]">{e.ownerPhone}</p>}
        </div>
      </div>
    </>
  )
}

export default OwnerInfoForm
