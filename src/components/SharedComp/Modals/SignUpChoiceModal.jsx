import Modal from './Modal'

function SignUpChoiceModal({ isOpen, onClose, onChoose }) {
  const cardClass =
    'group flex w-full flex-col items-start justify-between rounded-2xl border border-[#E5E7EB] bg-white p-6 text-left hover:border-[#F03331] hover:shadow-md'

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={920} height={680}>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] hover:bg-gray-100"
        aria-label="Close"
      >
        <span className="text-xl leading-none">×</span>
      </button>

      <div className="flex h-full flex-col px-10 pb-10 pt-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[26px] font-semibold text-[#111827]">Create your account</h2>
          <p className="mt-2 text-[13px] text-[#6B7280]">
            Choose how you’ll use Termbi. You can always switch later.
          </p>
        </div>

        <div className="mt-10 grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
          <button
            type="button"
            className={cardClass}
            onClick={() => {
              onChoose?.('owner')
              onClose?.()
            }}
          >
            <div className="flex w-full items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF6F6] text-[#F03331]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#111827]">Restaurant Owner</h3>
                  <p className="mt-1 text-[12px] text-[#6B7280]">Build your restaurant presence and manage operations.</p>
                </div>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF6F6] text-[#F03331] group-hover:bg-[#F03331] group-hover:text-white">
                →
              </div>
            </div>

            <div className="mt-5 w-full rounded-xl border border-[#F3F4F6] bg-white p-4">
              <div className="text-[12px] font-medium text-[#111827]">Best for you if you want to:</div>
              <ul className="mt-2 space-y-2 text-[12px] text-[#6B7280]">
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-2 w-2 rounded-full bg-[#F03331]" />
                  Create and manage your menu
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-2 w-2 rounded-full bg-[#F03331]" />
                  Receive reservations and orders
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-2 w-2 rounded-full bg-[#F03331]" />
                  Track customers and performance
                </li>
              </ul>
            </div>
          </button>

          <button
            type="button"
            className={cardClass}
            onClick={() => {
              onChoose?.('customer')
              onClose?.()
            }}
          >
            <div className="flex w-full items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF6F6] text-[#F03331]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 7h13l-1.5 7.5H9.5L8 7Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 7 7 4H3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#111827]">Customer</h3>
                  <p className="mt-1 text-[12px] text-[#6B7280]">Explore menus, book tables, and order in seconds.</p>
                </div>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF6F6] text-[#F03331] group-hover:bg-[#F03331] group-hover:text-white">
                →
              </div>
            </div>

            <div className="mt-5 w-full rounded-xl border border-[#F3F4F6] bg-white p-4">
              <div className="text-[12px] font-medium text-[#111827]">Best for you if you want to:</div>
              <ul className="mt-2 space-y-2 text-[12px] text-[#6B7280]">
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-2 w-2 rounded-full bg-[#F03331]" />
                  Book a table quickly
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-2 w-2 rounded-full bg-[#F03331]" />
                  Browse real menus and prices
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] h-2 w-2 rounded-full bg-[#F03331]" />
                  Track your orders and bookings
                </li>
              </ul>
            </div>
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <button
            type="button"
            className="h-11 w-[220px] rounded-md border border-[#E5E7EB] text-sm font-medium text-[#111827] hover:bg-[#F9FAFB]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default SignUpChoiceModal
