import { GrantsAndFundsData } from '../../data/GrantsAndFundsData.js'

// Mapping funding agencies to high-resolution web logo URLs
const AGENCY_LOGOS = {
  'Department of Science and Technology (DST)': 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Department_of_Science_and_Technology_India.png',
  'DST': 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Department_of_Science_and_Technology_India.png',
  'Ministry of Earth Sciences (MoES)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_of_India_logo.svg/512px-Government_of_India_logo.svg.png',
  'MoES': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Government_of_India_logo.svg/512px-Government_of_India_logo.svg.png',
  'ISRO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/512px-Indian_Space_Research_Organisation_Logo.svg.png',
  'Indian Space Research Organisation (ISRO)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/512px-Indian_Space_Research_Organisation_Logo.svg.png',
  'IIT Gandhinagar': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/IIT_Gandhinagar_Logo.svg/512px-IIT_Gandhinagar_Logo.svg.png',
}

export default function PartnersStrip() {
  const agencies = [...new Set(GrantsAndFundsData.map((g) => g.Agency))]
  const loop = [...agencies, ...agencies]

  return (
    <section className="py-14 border-y border-black/5 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.02]">
      <p className="max-w-6xl mx-auto px-6 text-xs text-slate400 mb-6 font-medium uppercase tracking-wider">
        Supported by
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max items-center gap-12 animate-marquee hover:[animation-play-state:paused]">
          {loop.map((agency, i) => {
            const logoUrl = AGENCY_LOGOS[agency]

            return (
              <div
                key={`${agency}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={`${agency} logo`}
                    className="h-9 w-auto object-contain max-w-[120px] filter dark:invert dark:brightness-200"
                    onError={(e) => {
                      // Hides image element if link fails to load and relies on text
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : null}
                
                <span className="text-sm sm:text-base font-display font-medium text-ink/70 dark:text-paper/70">
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