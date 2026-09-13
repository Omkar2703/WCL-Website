import { Link } from 'react-router-dom'
import { ResearchAreasData } from '../../data/ResearchAreasData.js'
import { topicSwatch } from '../../utils/placeholders.js'
import p2Img from '../assets/p2.jpeg'

const PILLAR_IMAGES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJcx9hKf8XlhJu9uY4R8pgyrQ7FJp0gBJ4MvpAstdBlw&s=10',
  p2Img,
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStA_IJXAzjiwRyS9uvCAdwq0XO7Rvv4k8gVBcDzQQTow&s=10',
  'https://public-storage.zapnito.com/__IfzPaFTS5dJTctxEyccPaZtOfsIPZIAMV2Op7wNSM'
]

function excerpt(text = '', max = 130) {
  const clean = text.trim()
  if (clean.length <= max) return clean
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '\u2026'
}

export default function PillarsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-slate-200/60 dark:border-slate-800 pb-8">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-teal-600 dark:text-teal-400">
            Research Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-2 max-w-[20ch]">
            Four questions guide everything we build
          </h2>
        </div>
        <p className="text-xs text-slate-400 font-mono"> TO UNCOVER DHOVERETAILS</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1400px' }}>
        {ResearchAreasData.map((area, index) => {
          const bgImage = area.Image || PILLAR_IMAGES[index % PILLAR_IMAGES.length] || topicSwatch(area.Title)

          return (
            <Link
              key={area.PageLink}
              to={`/research-areas/${area.PageLink}`}
              className="group relative h-80 rounded-2xl cursor-pointer focus:outline-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-0 rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-lg hover:shadow-2xl"
              >
                {/* Front Card - Full Clarity Image with Subtle Text Scaffolding */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-white/20 dark:border-slate-800 [backface-visibility:hidden] flex flex-col justify-between p-6 bg-slate-950"
                >
                  {/* High-Resolution Clear Background */}
                  <img
                    src={bgImage}
                    alt={area.Title}
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Elegant Gradient Rim ONLY at the bottom to guarantee text legibility without dimming the photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Pill */}
                  <div className="relative z-10 self-start">
                    <span className="px-3 py-1 text-[11px] font-mono tracking-wider text-white uppercase rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Front Title */}
                  <h3 className="relative z-10 text-white font-display font-semibold text-lg leading-snug tracking-wide drop-shadow-lg">
                    {area.Title}
                  </h3>
                </div>

                {/* Back Card - Ultra-Modern Glassmorphic Surface */}
                <div
                  className="absolute inset-0 rounded-2xl border border-teal-500/30 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl"
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase">
                      Pillar 0{index + 1} Scope
                    </span>
                    <h4 className="text-white font-semibold text-sm mt-1 mb-3 line-clamp-1">
                      {area.Title}
                    </h4>
                    <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed font-light">
                      {excerpt(area.Para1, 140)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-xs font-medium text-teal-400 group-hover:underline">
                      View research area
                    </span>
                    <div className="w-7 h-7 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
                      →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}