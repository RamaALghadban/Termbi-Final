import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NavBar from '../../components/SharedComp/NavBar/NavBar'
import { loginWithEmail, updateCustomerProfile } from '../../api/auth'
import { setStoredToken } from '../../api/config'
import { registerCustomer, resendVerificationCode, verifyCustomerEmail } from '../../api/customerAuth'

function Stepper({ step }) {
  const circle = (n) => {
    if (step > n) return 'bg-[#F03331] text-white border-[#F03331]'
    if (step === n) return 'bg-[#F03331] text-white border-[#F03331]'
    return 'bg-[#E5E7EB] text-[#9CA3AF] border-[#E5E7EB]'
  }

  const bar = (from) => {
    if (step > from) return 'bg-[#F03331]'
    return 'bg-[#E5E7EB]'
  }

  return (
    <div className="mb-10 flex items-center gap-4">
      <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium ${circle(1)}`}>1</div>
      <div className={`h-[2px] w-20 ${bar(1)}`} />
      <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium ${circle(2)}`}>2</div>
      <div className={`h-[2px] w-20 ${bar(2)}`} />
      <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium ${circle(3)}`}>✓</div>
    </div>
  )
}

function CustomerRegisterSteps() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [didLogin, setDidLogin] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const canRegister = useMemo(() => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      phone.trim() &&
      password &&
      passwordConfirmation &&
      password === passwordConfirmation
    )
  }, [email, firstName, lastName, password, passwordConfirmation, phone])

  const canVerify = useMemo(() => email.trim() && code.trim().length >= 4, [code, email])

  const handleRegister = async () => {
    if (!canRegister || isSubmitting) return
    try {
      setIsSubmitting(true)
      setError('')
      setSuccess('')

      const res = await registerCustomer({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        passwordConfirmation,
      })

      setStep(2)
      const possibleCode = res?.code || res?.verification_code || res?.data?.code || res?.data?.verification_code
      if (possibleCode) setSuccess(`Verification code: ${possibleCode}`)
    } catch (e) {
      setError(e?.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerify = async () => {
    if (!canVerify || isSubmitting) return
    try {
      setIsSubmitting(true)
      setError('')
      setSuccess('')

      await verifyCustomerEmail({ email: email.trim(), code: code.trim() })

      // Auto-login after verification
      const { token } = await loginWithEmail({ email: email.trim(), password })
      setStoredToken(token)
      try {
        localStorage.setItem('termby_auth', 'true')
        localStorage.setItem('termby_role', 'customer')
      } catch {
      }

      // Best-effort: ensure profile contains the data entered during registration.
      try {
        await updateCustomerProfile({ firstName: firstName.trim(), lastName: lastName.trim() })
      } catch {
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('termby:auth-changed', { detail: { isAuthenticated: true, role: 'customer' } }))
      }

      setDidLogin(true)

      setStep(3)
      setSuccess('Account created successfully!')
    } catch (e) {
      setError(e?.message || 'Verification failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkipVerification = () => {
    if (isSubmitting) return
    setError('')
    setSuccess('You can verify your email later. Use “Resend code” when you are ready.')
    setDidLogin(false)
    setStep(3)
  }

  const handleResend = async () => {
    if (!email.trim() || isSubmitting) return
    try {
      setIsSubmitting(true)
      setError('')
      setSuccess('')
      const res = await resendVerificationCode(email.trim())
      const possibleCode = res?.code || res?.verification_code || res?.data?.code || res?.data?.verification_code
      setSuccess(possibleCode ? `Verification code: ${possibleCode}` : 'Verification code resent')
    } catch (e) {
      setError(e?.message || 'Failed to resend code')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <NavBar />
      <main className="flex min-h-[calc(100vh-72px)] items-start justify-center px-6 pt-[72px] md:px-10">
        <div className="w-full max-w-[720px] py-12">
          <Stepper step={step} />

          <h1 className="text-[22px] font-semibold">Create Customer Account</h1>
          <p className="mt-2 text-sm text-[#6B7280]">Complete the steps below to create your account.</p>
          <p className="mt-2 text-[12px] text-[#9CA3AF]">If registration fails, the error shown below is coming from the API validation response.</p>

          {step === 1 && (
            <div className="mt-8 rounded-xl border border-[#F3F4F6] bg-white p-8 shadow-sm">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="text-[12px]">First name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[12px]">Last name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[12px]">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[12px]">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[12px]">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] px-4 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[12px]">Confirm password</label>
                  <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] px-4 text-sm"
                  />
                </div>
              </div>

              {password && passwordConfirmation && password !== passwordConfirmation && (
                <div className="mt-4 text-[12px] text-[#EC2323]">Passwords do not match</div>
              )}

              {error && <div className="mt-4 text-[12px] text-[#EC2323]">{error}</div>}

              <button
                type="button"
                disabled={!canRegister || isSubmitting}
                onClick={handleRegister}
                className="mt-6 h-11 w-full rounded-md bg-[#F03331] text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Creating…' : 'Register'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 rounded-xl border border-[#F3F4F6] bg-white p-8 shadow-sm">
              <div className="text-sm text-[#111827]">We sent a verification code to:</div>
              <div className="mt-1 text-sm font-semibold">{email}</div>

              <div className="mt-6">
                <label className="text-[12px]">Verification code</label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-[#E5E7EB] px-4 text-sm"
                />
              </div>

              {error && <div className="mt-4 text-[12px] text-[#EC2323]">{error}</div>}
              {success && <div className="mt-4 text-[12px] text-emerald-600">{success}</div>}

              <button
                type="button"
                disabled={!canVerify || isSubmitting}
                onClick={handleVerify}
                className="mt-6 h-11 w-full rounded-md bg-[#F03331] text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Verifying…' : 'Verify'}
              </button>

              <button
                type="button"
                onClick={handleSkipVerification}
                disabled={isSubmitting}
                className="mt-3 h-11 w-full rounded-md border border-[#E5E7EB] text-sm font-medium text-[#111827] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Skip for now
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={!email.trim() || isSubmitting}
                className="mt-3 h-11 w-full rounded-md border border-[#E5E7EB] text-sm font-medium text-[#111827] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Resend code
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="mt-8 rounded-xl border border-[#F3F4F6] bg-white p-10 text-center shadow-sm">
              <div className="text-[18px] font-semibold">Done!</div>
              <div className="mt-2 text-sm text-[#6B7280]">Your account is ready.</div>
              {success && <div className="mt-4 text-[12px] text-emerald-600">{success}</div>}

              <button
                type="button"
                className="mt-8 h-11 w-[240px] rounded-md bg-[#F03331] text-sm font-medium text-white"
                onClick={() => {
                  if (didLogin && typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('termby:auth-changed', { detail: { isAuthenticated: true, role: 'customer' } }),
                    )
                  }
                  navigate('/')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Go to Home
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CustomerRegisterSteps
