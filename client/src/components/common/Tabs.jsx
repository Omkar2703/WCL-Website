export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-black/5 dark:border-white/10 pb-px">
      {tabs.map((tab) => {
        const isActive = tab === active
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`relative px-4 py-2.5 text-sm rounded-t-row transition-colors ${
              isActive
                ? 'text-teal-deep dark:text-teal font-medium'
                : 'text-slate400 hover:text-ink dark:hover:text-paper'
            }`}
          >
            {tab}
            {isActive && (
              <span className="absolute left-3 right-3 -bottom-px h-[2px] bg-teal rounded-full" />
            )}
          </button>
        )
      })}
    </div>
  )
}
