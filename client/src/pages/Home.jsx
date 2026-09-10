import Hero from '../components/home/Hero.jsx'
import PillarsSection from '../components/home/PillarsSection.jsx'
import FacultyCard from '../components/home/FacultyCard.jsx'
import UpdatesTicker from '../components/home/UpdatesTicker.jsx'
import PartnersStrip from '../components/home/PartnersStrip.jsx'
import LabPhotoBand from '../components/home/LabPhotoBand.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <section className="max-w-6xl mx-auto px-6 py-4 grid md:grid-cols-5 gap-5">
        <div className="md:col-span-2">
          <FacultyCard />
        </div>
        <div className="md:col-span-3">
          <UpdatesTicker />
        </div>
      </section>
      <PillarsSection />
      <PartnersStrip />
      <LabPhotoBand />
    </>
  )
}
