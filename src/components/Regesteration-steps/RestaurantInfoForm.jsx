import UsaFlag from './Regesteration-steps-Image/usa 1.svg'

function RestaurantInfoForm({ value, onChange, errors }) {
  const restaurantName = value?.restaurantName ?? ''
  const restaurantAddress = value?.restaurantAddress ?? ''
  const restaurantPhone = value?.restaurantPhone ?? ''

  const setRestaurantName = onChange?.setRestaurantName
  const setRestaurantAddress = onChange?.setRestaurantAddress
  const setRestaurantPhone = onChange?.setRestaurantPhone

  const e = errors ?? {}

  return (
    <>
      <h1 className="mb-8 text-center text-[18px] font-semibold text-[#111827] md:text-[20px]">Tell us about your restaurant</h1>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="block text-[12px] font-medium text-[#111827]">
            Restaurant name <span className="text-[#F03331]">*</span>
          </label>
          <input
            type="text"
            className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:border-[#F03331]"
            value={restaurantName}
            onChange={(ev) => setRestaurantName?.(ev.target.value)}
          />
          {e.restaurantName && <p className="text-[11px] text-[#B91C1C]">{e.restaurantName}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-[12px] font-medium text-[#111827]">
            Restaurant address <span className="text-[#F03331]">*</span>
          </label>
          <input
            type="text"
            className="h-11 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:border-[#F03331]"
            value={restaurantAddress}
            onChange={(ev) => setRestaurantAddress?.(ev.target.value)}
          />
          {e.restaurantAddress && <p className="text-[11px] text-[#B91C1C]">{e.restaurantAddress}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-[12px] font-medium text-[#111827]">
            Restaurant phone <span className="text-[#F03331]">*</span>
          </label>
          <div className="flex h-11 w-full overflow-hidden rounded-md border border-[#E5E7EB] bg-white">
            <div className="flex items-center gap-2 border-r border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm">
              <img src={UsaFlag} alt="USA" className="h-4 w-6 object-cover" />
              <span className="text-[#111827]">+1</span>
            </div>
            <input
              type="tel"
              className="flex-1 px-4 text-sm outline-none"
              value={restaurantPhone}
              onChange={(ev) => setRestaurantPhone?.(ev.target.value)}
            />
          </div>
          {e.restaurantPhone && <p className="text-[11px] text-[#B91C1C]">{e.restaurantPhone}</p>}
        </div>
      </div>
    </>
  )
}

export default RestaurantInfoForm
