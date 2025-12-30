import { useEffect } from 'react'

function Modal({ isOpen, onClose, width = 800, height = 780, children }) {
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative max-w-full rounded-[24px] bg-white shadow-2xl"
        style={{ width, height }}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
