function PasswordForm({ value, onChange, errors }) {
  const password = value?.password ?? ''
  const passwordConfirm = value?.passwordConfirm ?? ''

  const setPassword = onChange?.setPassword
  const setPasswordConfirm = onChange?.setPasswordConfirm

  const e = errors ?? {}

  return (
    <>
      <h1 className="mb-8 text-center text-[18px] font-semibold text-[#111827] md:text-[20px]">Set your password</h1>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="block text-[12px] font-medium text-[#111827]">
            Password <span className="text-[#F03331]">*</span>
          </label>
          <div className="flex h-11 w-full items-center rounded-md border border-[#E5E7EB] bg-white px-4 text-sm">
            <input
              type="password"
              className="flex-1 outline-none"
              value={password}
              onChange={(ev) => setPassword?.(ev.target.value)}
            />
            <span className="cursor-pointer text-xs text-[#9CA3AF]">Show</span>
          </div>
          {e.password && <p className="text-[11px] text-[#B91C1C]">{e.password}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-[12px] font-medium text-[#111827]">
            Confirm password <span className="text-[#F03331]">*</span>
          </label>
          <div className="flex h-11 w-full items-center rounded-md border border-[#E5E7EB] bg-white px-4 text-sm">
            <input
              type="password"
              className="flex-1 outline-none"
              value={passwordConfirm}
              onChange={(ev) => setPasswordConfirm?.(ev.target.value)}
            />
            <span className="cursor-pointer text-xs text-[#9CA3AF]">Show</span>
          </div>
          {e.passwordConfirm && <p className="text-[11px] text-[#B91C1C]">{e.passwordConfirm}</p>}
        </div>
      </div>
    </>
  )
}

export default PasswordForm
