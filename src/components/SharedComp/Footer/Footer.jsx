import FooterBottom from './FooterBottom'
import Logo from '../NavBar/NavBarImages/Logo.svg'
import { Link } from 'react-router-dom'
import FaceIcon from './FooterImages/Face.svg'
import InstaIcon from './FooterImages/Insta.svg'
import XIcon from './FooterImages/X.svg'

function Footer() {
  return (
    <footer className="w-full bg-[#272727] text-white">
      <div className="px-4 py-12 sm:px-6 sm:py-14 lg:px-[120px] lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <img src={Logo} alt="Termbi" className="mb-6 h-14" />
            <p className="mb-4 text-[18px] font-medium text-white">Keep in touch</p>
            <div className="flex gap-4">
              <button type="button" aria-label="Facebook" className="hover:opacity-80">
                <img src={FaceIcon} alt="Facebook" className="h-7 w-7" />
              </button>
              <button type="button" aria-label="Instagram" className="hover:opacity-80">
                <img src={InstaIcon} alt="Instagram" className="h-7 w-7" />
              </button>
              <button type="button" aria-label="X" className="hover:opacity-80">
                <img src={XIcon} alt="X" className="h-7 w-7" />
              </button>
            </div>

            <div className="mt-6">
              <p className="mb-1 text-[18px] font-medium text-white">Provided by</p>
              <img src={Logo} alt="Termbi" className="h-5" />
              <p className="mt-1 text-[14px] text-white">www.termbi.com</p>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-[20px] font-semibold text-white">Opening Hours</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] text-white">08 AM TO 12 AM</p>
                  <p className="text-[14px] text-white">MONDAY TO FRIDAY</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] text-white">11 AM TO 10 PM</p>
                  <p className="text-[14px] text-white">SATURDAY & SUNDAY</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-[20px] font-semibold text-white">Quick Link</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  className="text-[14px] text-white hover:text-[#EC2323]"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('termby:open-login'))
                    }
                  }}
                >
                  Reserve a table
                </button>
              </li>
              <li>
                <Link to="/" className="text-[14px] text-white hover:text-[#EC2323]">
                  Home
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="text-[14px] text-white hover:text-[#EC2323]"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('termby:open-login'))
                    }
                  }}
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-[14px] text-white hover:text-[#EC2323]"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('termby:open-login'))
                    }
                  }}
                >
                  About us
                </button>
              </li>
              <li>
                <Link to="/contact" className="text-[14px] text-white hover:text-[#EC2323]">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-[20px] font-semibold text-white">Newsletters</h3>
            <p className="mb-6 text-[18px] leading-8 text-white">
              Stay up to date with our latest news, receive exclusive deals, and more
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-11 w-full rounded-md bg-white px-4 text-[14px] text-[#232323] outline-none placeholder:text-[#6B7280]"
              />
              <button
                type="submit"
                className="h-11 w-full rounded-md bg-[#EC2323] text-[16px] font-semibold text-white hover:bg-[#d32f2f]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <FooterBottom />
    </footer>
  )
}

export default Footer
