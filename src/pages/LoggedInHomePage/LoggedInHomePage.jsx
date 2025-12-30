import NavBar from '../../components/SharedComp/NavBar/NavBar'
import Footer from '../../components/SharedComp/Footer/Footer'
import ScrollReveal from '../../components/SharedComp/ScrollReveal'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import OurMenu from './components/OurMenu'

function LoggedInHomePage() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <NavBar />
      <main>
        <Hero />
        <ScrollReveal>
          <AboutUs />
        </ScrollReveal>
        <ScrollReveal>
          <OurMenu />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}

export default LoggedInHomePage
