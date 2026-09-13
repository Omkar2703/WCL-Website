import { Link } from 'react-router-dom'
import { ResearchAreasData } from '../../data/ResearchAreasData.js'
import { topicSwatch } from '../../utils/placeholders.js'
import p2Img from '../assets/p2.jpeg';
// High-resolution thematic background image fallbacks for research pillars
const PILLAR_IMAGES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJcx9hKf8XlhJu9uY4R8pgyrQ7FJp0gBJ4MvpAstdBlw&s=10', // Hydrology / Oceans / Water
  p2Img, // Climate / Agriculture / Land
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStA_IJXAzjiwRyS9uvCAdwq0XO7Rvv4k8gVBcDzQQTow&s=10', // Extreme Events / Floods / Droughts
  'https://public-storage.zapnito.com/__IfzPaFTS5dJTctxEyccPaZtOfsIPZIAMV2Op7wNSM'  // Satellite / Geospatial / Remote Sensing
]

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
        {ResearchAreasData.map((area, index) => {
          // Picks image from ResearchAreasData or falls back to theme-matched index picture
          const bgImage = area.Image || PILLAR_IMAGES[index % PILLAR_IMAGES.length] || topicSwatch(area.Title)

          return (
            <Link
              key={area.PageLink}
              to={`/research-areas/${area.PageLink}`}
              className="group relative h-64 rounded-hero"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-0 rounded-hero transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
              >
                {/* Front Card */}
                <div
                  className="absolute inset-0 rounded-hero overflow-hidden glass shadow-glow [backface-visibility:hidden] flex flex-col justify-end p-5"
                >
                  {/* Background Image with Configurable Opacity */}
                  <img
                    src={bgImage}
                    alt={area.Title}
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-40 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Multi-stage Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bgdark/95 via-bgdark/50 to-bgdark/10" />

                  {/* Front Title */}
                  <h3 className="relative text-paper font-display font-semibold text-lg leading-snug drop-shadow-md">
                    {area.Title}
                  </h3>
                </div>

                {/* Back Card */}
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
          )
        })}
      </div>
    </section>
  )
}