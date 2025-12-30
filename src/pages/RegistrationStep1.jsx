import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleLogo from '../components/Regesteration-steps/Regesteration-steps-Image/title.svg'
import Illustration from '../components/Regesteration-steps/Regesteration-steps-Image/illustration.png'
import RestaurantInfoForm from '../components/Regesteration-steps/RestaurantInfoForm'
import OwnerInfoForm from '../components/Regesteration-steps/OwnerInfoForm'
import PasswordForm from '../components/Regesteration-steps/PasswordForm'
import SuccessContent from '../components/Regesteration-steps/SuccessContent'
import NavBar from '../components/SharedComp/NavBar/NavBar'

function Stepper({ currentStep }) {
  const isSuccess = currentStep === 4

  const circleClass = (step) => {
    if (isSuccess) return 'bg-[#00C853] text-white border-[#00C853]'
    if (currentStep === step) return 'bg-[#F03331] text-white border-[#F03331]'
    if (currentStep > step) return 'bg-[#F03331] text-white border-[#F03331]'
    return 'bg-[#E5E7EB] text-[#9CA3AF] border-[#E5E7EB]'
  }

  const barClass = (fromStep) => {
    if (isSuccess) return 'bg-[#00C853]'
    if (currentStep > fromStep) return 'bg-[#F03331]'
    return 'bg-[#E5E7EB]'
  }

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium ${circleClass(1)}`}
      >
        1
      </div>
      <div className={`h-[2px] w-20 ${barClass(1)}`} />
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium ${circleClass(2)}`}
      >
        2
      </div>
      <div className={`h-[2px] w-20 ${barClass(2)}`} />
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium ${circleClass(3)}`}
      >
        3
      </div>
      <div className={`h-[2px] w-20 ${barClass(3)}`} />
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium ${
          isSuccess ? 'bg-[#00C853] text-white border-[#00C853]' : 'bg-[#E5E7EB] text-[#9CA3AF] border-[#E5E7EB]'
        }`}
      >
        ✓
      </div>
    </div>
  )
}
function LeftPanel({ currentStep, onNext, onGoDashboard }) {
  const isLastFormStep = currentStep === 3
  const isSuccess = currentStep === 4

  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantAddress, setRestaurantAddress] = useState('')
  const [restaurantPhone, setRestaurantPhone] = useState('')

  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ownerPhone, setOwnerPhone] = useState('')

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [showErrors, setShowErrors] = useState(false)

  const errors = (() => {
    const e = {}
    if (currentStep === 1) {
      if (!restaurantName.trim()) e.restaurantName = 'Restaurant name is required'
      if (!restaurantAddress.trim()) e.restaurantAddress = 'Restaurant address is required'
      if (!restaurantPhone.trim()) e.restaurantPhone = 'Restaurant phone is required'
    }
    if (currentStep === 2) {
      if (!ownerName.trim()) e.ownerName = 'Your name is required'
      if (!ownerEmail.trim()) e.ownerEmail = 'Your email is required'
      if (!ownerPhone.trim()) e.ownerPhone = 'Your phone is required'
      if (ownerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail.trim())) e.ownerEmail = 'Enter a valid email'
    }
    if (currentStep === 3) {
      if (!password) e.password = 'Password is required'
      if (!passwordConfirm) e.passwordConfirm = 'Confirm password is required'
      if (password && password.length < 6) e.password = 'Password must be at least 6 characters'
      if (password && passwordConfirm && password !== passwordConfirm) e.passwordConfirm = 'Passwords do not match'
    }
    return e
  })()

  const canProceed = Object.keys(errors).length === 0

  return (
    <section className="flex min-h-[calc(100vh-72px)] w-full items-center justify-center bg-[#FFF6F6] px-6 md:w-1/2 md:px-16">
      <div className="flex w-full max-w-[520px] flex-col justify-center">
        <div className="w-full">
          <Stepper currentStep={currentStep} />
        {!isSuccess && (
          <>
            {currentStep === 1 && (
              <RestaurantInfoForm
                value={{ restaurantName, restaurantAddress, restaurantPhone }}
                onChange={{
                  setRestaurantName,
                  setRestaurantAddress,
                  setRestaurantPhone,
                }}
                errors={showErrors ? errors : {}}
              />
            )}
            {currentStep === 2 && (
              <OwnerInfoForm
                value={{ ownerName, ownerEmail, ownerPhone }}
                onChange={{ setOwnerName, setOwnerEmail, setOwnerPhone }}
                errors={showErrors ? errors : {}}
              />
            )}
            {currentStep === 3 && (
              <PasswordForm
                value={{ password, passwordConfirm }}
                onChange={{ setPassword, setPasswordConfirm }}
                errors={showErrors ? errors : {}}
              />
            )}

            {showErrors && !canProceed && (
              <div className="mt-5 rounded-md border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2 text-[12px] text-[#B91C1C]">
                Please fill in the required fields.
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (!canProceed) {
                  setShowErrors(true)
                  return
                }
                setShowErrors(false)
                onNext()
              }}
              className="mt-7 h-11 w-full rounded-md bg-[#F03331] text-sm font-semibold text-white hover:bg-[#e22e2d] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!canProceed}
            >
              {isLastFormStep ? 'Register' : 'Next'}
            </button>

            <p className="mt-4 text-center text-[11px] text-[#6B7280]">
              You already have an account?{' '}
              <button className="text-[#F03331]">Log in</button>
            </p>
          </>
        )}
        {isSuccess && (
          <>
            <SuccessContent />
            <button
              type="button"
              onClick={onGoDashboard}
              className="mt-7 h-11 w-full rounded-md bg-[#F03331] text-sm font-semibold text-white hover:bg-[#e22e2d]"
            >
              Go to Dashboard
            </button>
          </>
        )}
        </div>
      </div>
    </section>
  )
}

function RightPanel() {
  return (
    <section className="hidden w-1/2 items-center justify-center bg-white px-8 md:flex md:px-14">
      <div className="w-full max-w-[980px] text-center">
        <img src={TitleLogo} alt="Termbi" className="mx-auto mb-2 h-16" />
        <p className="mb-8 text-[12px] font-medium tracking-wide text-[#9CA3AF]">
          Restaurants Management System
        </p>
        <img src={Illustration} alt="Restaurant management" className="mx-auto w-full max-w-[920px]" />
      </div>
    </section>
  )
}

function RegistrationStep1() {
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()

  const handleNext = () => {
    setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev))
  }

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <NavBar />
      <main className="flex min-h-[calc(100vh-72px)] pt-[72px]">
        <LeftPanel
          currentStep={currentStep}
          onNext={handleNext}
          onGoDashboard={() => {
            navigate('/dashboard/restaurant')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
        <RightPanel />
      </main>
    </div>
  )
}

export default RegistrationStep1
