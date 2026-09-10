import { Link } from 'react-router-dom'
import { ResearchAreasData } from '../../data/ResearchAreasData.js'
import { topicSwatch } from '../../utils/placeholders.js'

function excerpt(text = '', max = 130) {
  const clean = text.trim()
  if (clean.length <= max) return clean
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '\u2026'
}

export default function PillarsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight max-w-[24ch]">
        Four questions guide everything we build
      </h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: '1200px' }}>
        {ResearchAreasData.map((area) => (
          <Link
            key={area.PageLink}
            to={`/research-areas/${area.PageLink}`}
            className="group relative h-64 rounded-hero"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-0 rounded-hero transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-hero overflow-hidden glass shadow-glow [backface-visibility:hidden] flex flex-col justify-end p-5"
              >
                <img
                  src={area.Image || topicSwatch(area.Title)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bgdark/90 via-bgdark/30 to-transparent" />
                <h3 className="relative text-paper font-display font-semibold text-lg leading-snug">
                  {area.Title}
                </h3>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 rounded-hero glass-strong p-5 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
              >
                <p className="text-sm text-ink/80 dark:text-paper/80 leading-relaxed">
                  {excerpt(area.Para1)}
                </p>
                <span className="mt-4 text-xs font-medium text-teal-deep dark:text-teal">
                  View research area
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
