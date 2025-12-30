import HeroImage from './MainHomePageImages/Rectangle 7536.png'

function HeroSection() {
  return (
    <section
      className="relative h-[880px] w-full text-white"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative flex h-full flex-col items-start justify-center gap-10 px-6 md:px-0 md:pl-[161px] md:pr-16">
        <div className="max-w-[727px] space-y-6">
          <h1
            className="font-bold text-[40px] leading-[52px] md:text-[72px] md:leading-[100px]"
            style={{
              fontFamily:
                '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            Get your own restaurant website
          </h1>
          <p
            className="max-w-[655px] text-[24px] leading-[30px] text-gray-100"
            style={{
              fontFamily:
                '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            Termbi´s booking solution for restaurants makes a lot of your daily business tasks much easier, so that
            you can fully focus on your guests.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('termby:open-login'))
                }
              }}
              className="flex h-[56px] w-[400px] items-center justify-center rounded-lg bg-[#EC2323] text-[18px] leading-[26px] font-bold text-white hover:bg-[#e22e2d] md:text-[28px] md:leading-[45px]"
              style={{
                fontFamily:
                  '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              }}
            >
              Try Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
