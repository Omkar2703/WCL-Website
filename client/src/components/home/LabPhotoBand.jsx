export default function LabPhotoBand() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* No lab group photo was supplied -- replace the gradient div below
          with <img src={labPhoto} className="..." /> once one is uploaded. */}
      <div className="relative h-64 sm:h-80 rounded-hero overflow-hidden bg-[linear-gradient(120deg,#0F1E33_0%,#123549_45%,#0F766E_100%)] flex items-end p-8">
        <div className="absolute inset-0 bg-gradient-to-t from-bgdark/70 to-transparent" />
        <p className="relative text-paper/90 font-display text-lg sm:text-xl max-w-[38ch]">
          The Water &amp; Climate Lab team, Civil Engineering Department, IIT Gandhinagar.
        </p>
      </div>
    </section>
  )
}
