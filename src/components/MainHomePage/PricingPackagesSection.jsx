 
import CheckIcon from './MainHomePageImages/check.svg'

const BackgroundCurve = ({ className }) => (
  <svg
    width="407"
    height="248"
    viewBox="0 0 407 248"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 226.778V16C0 7.16345 7.16344 0 16 0H390.741C399.578 0 406.741 7.16344 406.741 16V130.843C359.616 183.35 285.335 224.523 197.682 240.51C125.565 253.663 56.4285 247.572 0 226.778Z"
      fill={'currentColor'}
    />
  </svg>
)

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['Services', 'Services', 'Services', 'Services', 'Services'],
  },
  {
    name: 'Premium',
    price: '$45',
    period: '/month',
    features: [
      'Reservation',
      'Ordering',
      'Marketing',
      'Services',
      'Services',
      'Services',
    ],
  },
  {
    name: 'Enterprise',
    price: '$75',
    period: '/month',
    features: [
      'Services',
      'Services',
      'Services',
      'Services',
      'Services',
      'Services',
      'Services',
    ],
  },
]

function PricingPackagesSection() {
  // Hover state and dynamic color effects removed; cards use static styling

  return (
    <section className="bg-white px-4 py-24 md:px-16">
      <div className="mx-auto max-w-[1556px]">
        {/* Header aligned to left */}
        <div className="text-center">
          <h2
            className="mx-auto mb-4 max-w-[1114px] text-center font-normal text-[32px] leading-[100%] text-[#EC2323] md:text-[64px]"
            style={{
              fontFamily:
                '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            Pricing <span className="text-[#111827]">Packages</span>
          </h2>
          <p className="mb-10 text-base text-[#4B5563]">
            Choose the plan that fits your restaurant today and scale as you grow.
          </p>
        </div>

        {/* Added margin bottom to separate title from cards */}
        <div className="h-16"></div>

        <div className="flex flex-wrap items-center justify-center gap-20">
          {plans.map((plan) => {
            return (
              <div
                key={plan.name}
                className="group relative flex h-[690px] w-[406px] flex-col items-center rounded-2xl border border-[#E5E7EB] bg-white shadow-xl overflow-hidden"
              >
                <BackgroundCurve
                  className="absolute top-0 left-0 w-full h-[250px] text-[#FFEDED] transition-colors duration-300 group-hover:text-[#EC2323]"
                />

                <div className="relative z-10 flex h-full w-full flex-col px-8 pt-16 pb-10">
                  <div className="mb-8 text-left">
                    <h3 className="mb-2 text-[32px] font-semibold text-[#111827] transition-colors duration-300 group-hover:text-white">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-start gap-1">
                      <span className="text-[40px] font-bold text-[#111827] transition-colors duration-300 group-hover:text-white">
                        {plan.price}
                      </span>
                      <span className="text-base text-[#6B7280] opacity-100 transition-colors duration-300 group-hover:text-white">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Spacer and Features */}
                  <div className="mt-12 flex-1 pl-4">
                    <ul className="space-y-4 text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="transition-all duration-300">
                            <img
                              src={CheckIcon}
                              alt=""
                              className="h-[23px] w-[23px] transition-all duration-300"
                            />
                          </div>
                          <span className="text-[18px] leading-[23px] font-medium text-[#374151]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className="mt-auto flex items-center justify-center text-lg font-medium transition-colors duration-300 mx-auto bg-[#FFF4F4] text-[#111827] group-hover:bg-[#EC2323] group-hover:text-white"
                    style={{
                      width: '346px',
                      height: '69px',
                      borderRadius: '10px',
                    }}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingPackagesSection
