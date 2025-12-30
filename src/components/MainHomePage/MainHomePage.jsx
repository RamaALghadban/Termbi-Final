import NavBar from '../SharedComp/NavBar/NavBar'
import Footer from '../SharedComp/Footer/Footer'
import HeroSection from './HeroSection'
import WhyTermbiSection from './WhyTermbiSection'
import TrustedRestaurantsSection from './TrustedRestaurantsSection'
import PricingPackagesSection from './PricingPackagesSection'
import FeaturesSection from './FeaturesSection'
import ScrollReveal from '../SharedComp/ScrollReveal'

function MainHomePage() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <NavBar />
      <main>
        <HeroSection />
        <ScrollReveal>
          <WhyTermbiSection />
        </ScrollReveal>
        <ScrollReveal>
          <TrustedRestaurantsSection />
        </ScrollReveal>
        <ScrollReveal>
          <PricingPackagesSection />
        </ScrollReveal>
        <ScrollReveal>
          <FeaturesSection />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}

export default MainHomePage
