import { useState } from 'react'
import { Download, ExternalLink, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '../components/common/PageHeader.jsx'
import { Dataset } from '../data/DataSetsData.js'
import { topicSwatch } from '../utils/placeholders.js'

function excerpt(text = '', max = 140) {
  const clean = text.trim()
  if (clean.length <= max) return clean
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '\u2026'
}

export default function Datasets() {
  const [active, setActive] = useState(null)

  return (
    <>
      <PageHeader
        title="Datasets"
        description="Long-term hydro-climatic datasets produced by the lab, released openly for reuse in research, planning and policy."
      />
      <div className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Dataset.map((d) => (
          <button
            key={d.DataName}
            onClick={() => setActive(d)}
            className="text-left glass rounded-hero overflow-hidden flex flex-col hover:shadow-glow transition-shadow"
          >
            <img src={d.ImagesLink || topicSwatch(d.DataName)} alt="" className="h-36 w-full object-cover" />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display font-semibold text-sm leading-snug">{d.DataName}</h3>
              <p className="mt-2 text-xs text-slate400 leading-relaxed flex-1">{excerpt(d.Description)}</p>
              <span className="mt-4 text-xs font-medium text-teal-deep dark:text-teal">View details</span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-40 bg-bgdark/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 z-50 w-auto sm:w-[560px] max-h-[85vh] overflow-y-auto slim-scroll glass-strong rounded-hero p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display font-semibold text-lg leading-snug">{active.DataName}</h3>
                <button onClick={() => setActive(null)} aria-label="Close" className="shrink-0 p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                  <X size={18} />
                </button>
              </div>
              <img src={active.ImagesLink || topicSwatch(active.DataName)} alt="" className="mt-4 w-full h-40 object-cover rounded-row" />
              <p className="mt-4 text-sm text-ink/80 dark:text-paper/80 leading-relaxed whitespace-pre-line">
                {active.Description}
              </p>
              {active.Authors?.length > 0 && (
                <p className="mt-4 text-xs text-slate400">{active.Authors.join(', ')}</p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                {active.PaperLink && (
                  <a href={active.PaperLink} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-4 py-2 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/10">
                    <ExternalLink size={14} /> Read the paper
                  </a>
                )}
                {active.DataLink && (
                  <a href={active.DataLink} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-teal text-bgdark px-4 py-2 text-xs font-medium hover:bg-teal-soft">
                    <Download size={14} /> Download dataset
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
