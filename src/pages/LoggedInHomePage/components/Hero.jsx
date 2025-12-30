import GeoIcon from '../LoggedInHomePageImages/geo-alt-fill.svg'
import HeroImg from '../LoggedInHomePageImages/Hero img02.png'
import StarIcon from '../LoggedInHomePageImages/Vector (1).svg'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-[#FAFAFA] pt-[72px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 py-14 md:grid-cols-2 md:px-10 lg:px-0">
        <div>
          <h1 className="text-[32px] font-semibold leading-tight text-[#111827] md:text-[40px]">
            Best <span className="text-[#EC2323]">Food</span>, Best <span className="text-[#EC2323]">Services</span>!
          </h1>
          <p className="mt-4 max-w-[420px] text-[18px] leading-relaxed text-[#6B7280]">
            Sandwiches, Fries & Burger with best taste awaits you.
          </p>

          <div className="mt-8 flex items-start gap-3">
            <img src={GeoIcon} alt="Location" className="mt-1 h-6 w-6" />
            <p className="text-[16px] text-[#374151]">2255 Nw 2nd Ave, Miami, FL 37214</p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-[16px] text-[#374151]">Rating</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <img key={idx} src={StarIcon} alt="Star" className="h-4 w-4" />
              ))}
            </div>
            <span className="text-[14px] text-[#111827]">5.0</span>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex h-11 w-[220px] items-center justify-center rounded-md bg-[#EC2323] text-[14px] font-semibold text-white hover:bg-[#d81f1f]"
            onClick={() => navigate('/reserve')}
          >
            Reserve a table
          </button>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative h-[320px] w-[320px] overflow-hidden rounded-full bg-white shadow-sm md:h-[380px] md:w-[380px]">
            <img src={HeroImg} alt="Food" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
