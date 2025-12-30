import Ellipse1 from './MainHomePageImages/Ellipse 1.svg'
import Ellipse2 from './MainHomePageImages/Ellipse 2.svg'

function WhyTermbiSection() {
  return (
    <section className="bg-white px-4 py-24 md:px-16">
      <div className="mx-auto flex justify-center">
        <div className="relative w-full max-w-[1596px] min-h-[544px] rounded-2xl bg-white px-6 py-12 shadow-sm md:px-16 md:py-16 overflow-hidden">
          <div className="pointer-events-none absolute -top-6 -left-6 hidden md:block rotate-180">
            <img src={Ellipse1} alt="" className="w-[256px] h-[256px] opacity-60" />
          </div>
          <div className="pointer-events-none absolute -bottom-6 -right-6 hidden md:block rotate-180">
            <img src={Ellipse2} alt="" className="w-[256px] h-[256px] opacity-60" />
          </div>

          <h2
            className="mx-auto mb-4 max-w-[1114px] text-center font-normal text-[32px] leading-[100%] text-[#EC2323] md:text-[64px]"
            style={{
              fontFamily:
                '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            Why <span className="text-[#111827]">termbi</span>
          </h2>
          <p
            className="mx-auto max-w-[1114px] text-center text-[20px] leading-[32px] text-[#272727] md:text-[32px] md:leading-[50px]"
            style={{
              fontFamily:
                '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            Termbi&apos;s booking tool allows guests to check table availability in real time and then book a table
            within just a few clicks. Centralize operations of your business house. Your offers look far better. Up
            to 30% more bookings. With Termbi, you are instantly listed on over 100 national and international
            platforms.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhyTermbiSection
