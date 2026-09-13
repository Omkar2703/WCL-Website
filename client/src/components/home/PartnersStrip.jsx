import { GrantsAndFundsData } from '../../data/GrantsAndFundsData.js'
import moes from '../assets/moes.png';
import jal from '../assets/jal.png';
import moef from '../assets/moef.png';
import me from '../assets/me.png';
// Direct public CDN image URLs for each agency emblem/logo
const AGENCY_LOGOS = {
  // Government of India Emblem (Ashoka Stambha) - used by Central Ministries
  'Ministry of Water Resources':
    jal,
  'Ministry of Earth Sciences':
    moes,
  'Ministry of Environment and Forest':
    moef,
  // Digital India / Media Lab Asia Logo
  'Media Lab Asia':
    me
}

export default function PartnersStrip() {
  const agencies = [...new Set(GrantsAndFundsData.map((g) => g.Agency))]
  const loop = [...agencies, ...agencies, ...agencies]

  return (
    <section className="py-14 border-y border-black/5 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.02]">
      <p className="max-w-6xl mx-auto px-6 text-xs text-slate-400 mb-6 font-medium uppercase tracking-wider">
        Supported by
      </p>

      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max items-center gap-12 animate-marquee hover:[animation-play-state:paused]">
          {loop.map((agency, i) => {
            const logoUrl = AGENCY_LOGOS[agency]

            return (
              <div
                key={`${agency}-${i}`}
                className="flex items-center gap-3.5 whitespace-nowrap opacity-85 hover:opacity-100 transition-opacity duration-300"
              >
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt={`${agency} logo`}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="h-8 w-auto object-contain flex-shrink-0 filter dark:brightness-150 dark:invert-[0.15]"
                    onError={(e) => {
                      // Hides broken image tag cleanly if network blocks hotlinking
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
                <span className="text-sm sm:text-base font-display font-medium text-ink/80 dark:text-paper/80">
                  {agency}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}