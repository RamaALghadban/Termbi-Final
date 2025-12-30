import DashboardImage from './MainHomePageImages/dashboard.png'

function FeaturesSection() {
  return (
    <section className="bg-white px-4 py-24 md:px-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-[48px] font-semibold text-[#111827] text-center">
          termbi <span className="text-[#F03331]">Features</span>
        </h2>
        <div className="mx-auto flex flex-col items-start gap-16 md:flex-row">
          <div className="w-full max-w-[420px] space-y-6">
            <h3 className="text-[36px] font-semibold text-[#111827]">Dashboard</h3>
            <p className="text-[18px] leading-[28px] text-[#4B5563]">
              Learn how your business performs at a glance. Get real-time information from restaurant locations in
              one place. Manage analytics, KPIs and insights with ease. Data-informed decisions ensure your brand is
              always in the best competitive position.
            </p>
          </div>
          <div className="w-[682px]">
            <img
              src={DashboardImage}
              alt="Dashboard preview"
              className="w-[682px] h-[472px] rounded-2xl border border-[#F3F4F6] bg-white shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
