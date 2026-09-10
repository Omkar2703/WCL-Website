import { GrantsAndFundsData } from '../../data/GrantsAndFundsData.js'

export default function PartnersStrip() {
  const agencies = [...new Set(GrantsAndFundsData.map((g) => g.Agency))]
  const loop = [...agencies, ...agencies]

  return (
    <section className="py-14 border-y border-black/5 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.02]">
      <p className="max-w-6xl mx-auto px-6 text-xs text-slate400 mb-6">
        Supported by
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-10 animate-marquee hover:[animation-play-state:paused]">
          {loop.map((agency, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm sm:text-base font-display font-medium text-ink/50 dark:text-paper/50"
            >
              {agency}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
