import NavBar from '../../components/SharedComp/NavBar/NavBar'
import Footer from '../../components/SharedComp/Footer/Footer'
import ReserveDetails from './components/ReserveDetails'

function ReservationSteps() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <NavBar />
      <main className="pt-[72px]">
        <ReserveDetails />
      </main>
      <Footer />
    </div>
  )
}

export default ReservationSteps
