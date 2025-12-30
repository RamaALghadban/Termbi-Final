import { useState } from 'react'

import Modal from './Modal'
import { loginWithEmail } from '../../../api/auth'
import { setStoredToken } from '../../../api/config'

function LoginModal({ isOpen, onClose, onOpenSignUp, onSuccess }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (isSubmitting) return
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter email and password')
      return
    }

    try {
      setIsSubmitting(true)
      const { token } = await loginWithEmail({ email: email.trim(), password })
      setStoredToken(token)
      onSuccess?.()
    } catch (e) {
      setError(e?.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={920} height={680}>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] hover:bg-gray-100"
        aria-label="Close"
      >
        <span className="text-xl leading-none">×</span>
      </button>

      <div className="grid h-full grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2">
        <div className="hidden h-full flex-col justify-between bg-gradient-to-br from-[#EC2323] via-[#F05252] to-[#F8B4B4] p-10 text-white md:flex">
          <div>
            <div className="text-[22px] font-semibold">Welcome back</div>
            <div className="mt-2 max-w-[320px] text-[13px] text-white/90">
              Log in to continue your bookings, reservations, and explore menus.
            </div>
          </div>

          <div className="rounded-xl bg-white/10 p-6 text-[13px] leading-6">
            <div className="font-medium">Tip</div>
            <div className="mt-1 text-white/90">Use the same email you registered with.</div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-center bg-white px-8 py-10 md:px-12">
          <div className="mx-auto w-full max-w-[420px]">
            <h2 className="text-[28px] font-semibold text-[#111827]">Log in</h2>
            <p className="mt-2 text-[13px] text-[#6B7280]">Enter your email and password to access your account.</p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-[12px] font-medium text-[#111827]">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-12 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:border-[#F03331]"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#111827]">Password</label>
                <div className="relative mt-2">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleLogin()
                    }}
                    className="h-12 w-full rounded-md border border-[#E5E7EB] bg-white px-4 pr-12 text-sm outline-none focus:border-[#F03331]"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                    aria-label="Toggle password visibility"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7S2 12 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {!isPasswordVisible && (
                        <path
                          d="M4 4l16 16"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2 text-[12px] text-[#B91C1C]">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleLogin}
                className="h-12 w-full rounded-md bg-[#F03331] text-sm font-semibold text-white hover:bg-[#e22e2d] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in…' : 'Log in'}
              </button>
            </div>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E5E7EB]" />
              <span className="text-xs text-[#6B7280]">OR</span>
              <div className="h-px flex-1 bg-[#E5E7EB]" />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#E5E7EB] bg-white text-sm font-medium text-[#111827] hover:bg-[#F9FAFB]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6] text-[18px] font-semibold text-[#6B7280]">
                  G
                </span>
                Continue with Google
              </button>
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#E5E7EB] bg-white text-sm font-medium text-[#111827] hover:bg-[#F9FAFB]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6] text-[18px] font-semibold text-[#6B7280]">
                  f
                </span>
                Continue with Facebook
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-[#6B7280]">
              New in termbi?{' '}
              <button type="button" className="font-medium text-[#F03331]" onClick={onOpenSignUp}>
                Create new account
              </button>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal
