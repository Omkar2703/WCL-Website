import { useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Tabs from '../components/common/Tabs.jsx'
import { PublicationsData } from '../data/PublicationsData.js'

export default function Publications() {
  // Extract unique publication types
  const types = useMemo(
    () => [...new Set(PublicationsData.map((p) => p.PublicationType))],
    []
  )
  const [activeType, setActiveType] = useState(types[0])

  // Extract years available for the currently selected Publication Type
  const availableYears = useMemo(() => {
    const years = PublicationsData.filter(
      (p) => p.PublicationType === activeType
    )
      .map((p) => p.PublicationYear || 'Undated')
      .filter(Boolean)

    const uniqueYears = [...new Set(years)].sort((a, b) => b.localeCompare(a))
    return ['All Years', ...uniqueYears]
  }, [activeType])

  const [activeYear, setActiveYear] = useState('All Years')

  // Reset selected year back to 'All Years' whenever switching publication types
  const handleTypeChange = (newType) => {
    setActiveType(newType)
    setActiveYear('All Years')
  }

  // Filter and group publications by Year based on active tabs
  const grouped = useMemo(() => {
    const filtered = PublicationsData.filter((p) => {
      const matchesType = p.PublicationType === activeType
      const matchesYear =
        activeYear === 'All Years' || (p.PublicationYear || 'Undated') === activeYear
      return matchesType && matchesYear
    })

    const byYear = {}
    filtered.forEach((p) => {
      const year = p.PublicationYear || 'Undated'
      byYear[year] = byYear[year] || []
      byYear[year].push(p)
    })

    return Object.entries(byYear).sort((a, b) => b[0].localeCompare(a[0]))
  }, [activeType, activeYear])

  const total = grouped.reduce((sum, [, items]) => sum + items.length, 0)

  return (
    <>
      <PageHeader
        title="Publications"
        description="Peer-reviewed work from the lab, grouped by type and year."
      />
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Primary Tabs: Publication Types */}
        <Tabs tabs={types} active={activeType} onChange={handleTypeChange} />

        {/* Secondary Sub-Tabs: Years */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-black/5 dark:border-white/10">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2 shrink-0">
            Year:
          </span>
          {availableYears.map((yr) => {
            const isActive = activeYear === yr
            return (
              <button
                key={yr}
                onClick={() => setActiveYear(yr)}
                className={`px-3 py-1 text-xs rounded-full font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30 font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {yr}
              </button>
            )
          })}
        </div>

        {/* Results Counter */}
        <p className="text-xs text-slate400 mt-4 font-mono">
          Showing {total} {total === 1 ? 'publication' : 'publications'}
        </p>

        {/* Publications List */}
        <div className="py-8 space-y-10">
          {grouped.length > 0 ? (
            grouped.map(([year, items]) => (
              <div key={year}>
                <h3 className="font-display font-semibold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{year}</span>
                  <span className="text-xs font-normal text-slate-400">
                    ({items.length})
                  </span>
                </h3>
                <ul className="space-y-3">
                  {items.map((pub, i) => (
                    <li
                      key={i}
                      className="rounded-row glass p-4 flex items-start justify-between gap-4 text-sm leading-relaxed hover:border-teal-500/30 transition-colors group"
                    >
                      <span className="text-ink/80 dark:text-paper/80 font-normal">
                        {pub.PublicationTitle}
                      </span>
                      {pub.PublicationLink && (
                        <a
                          href={pub.PublicationLink}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-teal-deep dark:text-teal opacity-70 group-hover:opacity-100 transition-opacity p-1"
                          aria-label="Open publication"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-center py-16 rounded-hero glass border border-dashed border-slate-300 dark:border-slate-800">
              <p className="text-sm text-slate-500">
                No publications found for the selected year filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}