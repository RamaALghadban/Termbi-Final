import { useEffect, useState } from 'react'
import ProfileLayout from './ProfileLayout'
import { getProfile, updateCustomerProfile } from '../../api/auth'
import { getStoredToken } from '../../api/config'

function ManageProfile() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [refreshIndex, setRefreshIndex] = useState(0)

  useEffect(() => {
    let alive = true

    const run = async () => {
      try {
        setIsLoading(true)
        setError('')

        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setUsername('')

        const token = getStoredToken()
        if (!token) {
          setError('Please log in to view your profile')
          return
        }
        const res = await getProfile()
        const p = res?.data?.data || res?.data || res || {}

        if (!alive) return
        if (typeof p.first_name === 'string') setFirstName(p.first_name)
        if (typeof p.last_name === 'string') setLastName(p.last_name)
        if (typeof p.email === 'string') setEmail(p.email)
        if (typeof p.phone === 'string') setPhone(p.phone)
        if (typeof p.username === 'string') setUsername(p.username)
      } catch (e) {
        if (!alive) return
        setError(e?.message || 'Failed to load profile')
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setUsername('')
      } finally {
        if (!alive) return
        setIsLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [refreshIndex])

  useEffect(() => {
    const onAuthChanged = () => setRefreshIndex((x) => x + 1)
    window.addEventListener('termby:auth-changed', onAuthChanged)
    return () => window.removeEventListener('termby:auth-changed', onAuthChanged)
  }, [])

  const handleSave = async () => {
    if (isSaving) return
    try {
      setIsSaving(true)
      setError('')
      await updateCustomerProfile({ firstName, lastName })
      window.alert('Saved!')
    } catch (e) {
      setError(e?.message || 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ProfileLayout activeId="manage" crumb="Manage Profile" title="Manage Profile">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-[#E5E7EB]" />
        <div>
          <div className="text-[12px] font-semibold text-[#111827]">{`${firstName} ${lastName}`.trim()}</div>
          <button type="button" className="text-[11px] text-[#EC2323]">Change image</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="text-[12px] text-[#111827]">First name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            className="mt-2 h-10 w-full rounded-md border border-[#E5E7EB] px-3 text-[12px]"
          />
        </div>
        <div>
          <label className="text-[12px] text-[#111827]">Last name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
            className="mt-2 h-10 w-full rounded-md border border-[#E5E7EB] px-3 text-[12px]"
          />
        </div>
        <div>
          <label className="text-[12px] text-[#111827]">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled
            className="mt-2 h-10 w-full rounded-md border border-[#E5E7EB] px-3 text-[12px]"
          />
        </div>
        <div>
          <label className="text-[12px] text-[#111827]">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled
            className="mt-2 h-10 w-full rounded-md border border-[#E5E7EB] px-3 text-[12px]"
          />
        </div>
        <div className="md:col-span-2 max-w-[360px]">
          <label className="text-[12px] text-[#111827]">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
            className="mt-2 h-10 w-full rounded-md border border-[#E5E7EB] px-3 text-[12px]"
          />
        </div>
      </div>

      {error && <div className="mt-6 text-center text-[12px] text-[#EC2323]">{error}</div>}

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          className="h-10 w-[180px] rounded-md bg-[#EC2323] text-[12px] font-semibold text-white"
          onClick={handleSave}
          disabled={isLoading || isSaving}
        >
          {isSaving ? 'Saving…' : 'Save Change'}
        </button>
      </div>
    </ProfileLayout>
  )
}

export default ManageProfile
