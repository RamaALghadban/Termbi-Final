import NavBar from '../../components/SharedComp/NavBar/NavBar'
import Footer from '../../components/SharedComp/Footer/Footer'

import PhoneIcon from './ContactUsImages/Frame 831.svg'
import EmailIcon from './ContactUsImages/Frame 833.svg'
import FaxIcon from './ContactUsImages/Frame 835.svg'
import ContactImage from './ContactUsImages/contact-image.png'

function ContactUs() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <NavBar />
      <main className="mx-auto max-w-[1440px] px-6 pb-20 pt-[120px] md:px-10 lg:px-[120px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <section className="w-full max-w-[520px]">
            <h1 className="font-sfpro text-[24px] font-bold leading-[32px] text-[#EC2323]">Contact Us</h1>
            <p className="mt-3 max-w-[420px] text-[12px] leading-[18px] text-[#6B7280]">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et
              Dolore Magna
            </p>

            <form className="mt-8 w-full">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-[#6B7280]">
                    Name <span className="text-[#EC2323]">*</span>
                  </label>
                  <input
                    type="text"
                    className="h-10 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-[12px] outline-none focus:border-[#EC2323]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-[#6B7280]">Email</label>
                  <input
                    type="email"
                    className="h-10 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-[12px] outline-none focus:border-[#EC2323]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-[#6B7280]">
                    Phone number <span className="text-[#EC2323]">*</span>
                  </label>
                  <input
                    type="tel"
                    className="h-10 w-full rounded-md border border-[#E5E7EB] bg-white px-4 text-[12px] outline-none focus:border-[#EC2323]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-medium text-[#6B7280]">How did you find us?</label>
                  <div className="relative">
                    <select className="h-10 w-full appearance-none rounded-md border border-[#E5E7EB] bg-white px-4 pr-10 text-[12px] text-[#111827] outline-none focus:border-[#EC2323]">
                      <option value="" />
                      <option value="google">Google</option>
                      <option value="facebook">Facebook</option>
                      <option value="friend">Friend</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#EC2323]">▾</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-2 h-10 w-full rounded-md bg-[#EC2323] text-[12px] font-bold text-white hover:bg-[#d61f1f]"
                >
                  SEND
                </button>
              </div>
            </form>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <img src={PhoneIcon} alt="Phone" className="h-6 w-6" />
                <div>
                  <p className="text-[10px] font-bold text-[#111827]">PHONE</p>
                  <p className="mt-1 text-[10px] text-[#6B7280]">+44 543 871 1234</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <img src={FaxIcon} alt="Fax" className="h-6 w-6" />
                <div>
                  <p className="text-[10px] font-bold text-[#111827]">FAX</p>
                  <p className="mt-1 text-[10px] text-[#6B7280]">+44 543 871 1234</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <img src={EmailIcon} alt="Email" className="h-6 w-6" />
                <div>
                  <p className="text-[10px] font-bold text-[#111827]">EMAIL</p>
                  <p className="mt-1 text-[10px] text-[#6B7280]">info@termbi.com</p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-[560px]">
              <img src={ContactImage} alt="Contact" className="w-full rounded-[24px] object-cover" />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactUs
