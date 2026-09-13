export default function LabPhotoBand() {
  // Replace this URL with your actual lab group photo asset
  const photoUrl = "https://vmishra.people.iitgn.ac.in/water&climate/static/media/LabMembers.440e84afdaacb2ccb9ee.JPG"

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="relative rounded-hero overflow-hidden">
        <img
          src={photoUrl}
          alt="Water & Climate Lab team, Civil Engineering Department, IIT Gandhinagar"
          className="w-full h-auto max-h-[500px] object-cover rounded-hero"
        />
      </div>
    </section>
  )
}