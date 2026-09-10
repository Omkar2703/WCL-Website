import { ExternalLink } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import { DataPortalsData } from '../data/DataPortalsData.js'
import { topicSwatch } from '../utils/placeholders.js'

export default function Products() {
  return (
    <>
      <PageHeader
        title="Products"
        description="Public monitoring platforms built and maintained by the lab, each running on its own domain."
      />
      <div className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 gap-6">
        {DataPortalsData.map((portal) => (
          <a
            key={portal.Title}
            href={portal.Link}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-hero overflow-hidden flex flex-col hover:shadow-glow transition-shadow"
          >
            <img src={portal.Image || topicSwatch(portal.Title)} alt="" className="h-40 w-full object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-display font-semibold">{portal.Title}</h3>
              {portal.Description && (
                <p className="mt-2 text-sm text-slate400 leading-relaxed flex-1">{portal.Description}</p>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-teal-deep dark:text-teal">
                Visit platform <ExternalLink size={13} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </>
  )
}
