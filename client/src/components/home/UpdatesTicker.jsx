import { RecentUpdatesData } from '../../data/RecentUpdatesData.js'

export default function UpdatesTicker() {
  const items = [...RecentUpdatesData, ...RecentUpdatesData] // duplicated for seamless loop

  return (
    <div className="glass rounded-hero p-6 h-full flex flex-col">
      <h3 className="font-display font-semibold mb-4">Latest updates</h3>
      <div className="relative flex-1 min-h-[220px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <ul className="absolute inset-x-0 top-0 animate-scrolly hover:[animation-play-state:paused] space-y-4">
          {items.map((update, i) => (
            <li key={i}>
              <a
                href={update.ArticleLink}
                target="_blank"
                rel="noreferrer"
                className="block text-sm leading-snug text-ink/80 dark:text-paper/80 hover:text-teal-deep dark:hover:text-teal transition-colors border-l-2 border-teal/40 pl-3"
              >
                {update.Title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
