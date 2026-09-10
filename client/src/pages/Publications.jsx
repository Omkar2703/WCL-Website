import { useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import Tabs from '../components/common/Tabs.jsx'
import { PublicationsData } from '../data/PublicationsData.js'

export default function Publications() {
  const types = useMemo(
    () => [...new Set(PublicationsData.map((p) => p.PublicationType))],
    []
  )
  const [tab, setTab] = useState(types[0])

  const grouped = useMemo(() => {
    const byYear = {}
    PublicationsData.filter((p) => p.PublicationType === tab).forEach((p) => {
      const year = p.PublicationYear || 'Undated'
      byYear[year] = byYear[year] || []
      byYear[year].push(p)
    })
    return Object.entries(byYear).sort((a, b) => b[0].localeCompare(a[0]))
  }, [tab])

  const total = grouped.reduce((sum, [, items]) => sum + items.length, 0)

  return (
    <>
      <PageHeader
        title="Publications"
        description="Peer-reviewed work from the lab, grouped by type and year."
      />
      <div className="max-w-6xl mx-auto px-6">
        <Tabs tabs={types} active={tab} onChange={setTab} />
        <p className="text-xs text-slate400 mt-4">{total} publications</p>

        <div className="py-8 space-y-10">
          {grouped.map(([year, items]) => (
            <div key={year}>
              <h3 className="font-display font-semibold text-lg mb-4">{year}</h3>
              <ul className="space-y-3">
                {items.map((pub, i) => (
                  <li
                    key={i}
                    className="rounded-row glass p-4 flex items-start justify-between gap-4 text-sm leading-relaxed"
                  >
                    <span className="text-ink/80 dark:text-paper/80">{pub.PublicationTitle}</span>
                    <a
                      href={pub.PublicationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-teal-deep dark:text-teal"
                      aria-label="Open publication"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
