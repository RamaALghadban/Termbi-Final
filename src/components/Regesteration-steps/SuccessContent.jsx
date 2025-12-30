function SuccessContent() {
  return (
    <div className="pt-10">
      <h2 className="mb-4 text-2xl font-semibold text-[#00C853]">Congratulation!</h2>
      <p className="mb-2 text-lg font-medium text-[#00C853]">Your account has created successfully!</p>
      <p className="mb-10 text-base font-medium text-[#111827]">Get your restaurant started</p>
      <p className="mb-1 text-sm text-[#4B5563]">
        A verification code has been sent to your email.
      </p>
      <p className="text-sm text-[#4B5563]">
        Please verify your account via email.{' '}
        <button className="text-[#F03331] underline">Open my email</button>
      </p>
    </div>
  )
}

export default SuccessContent
