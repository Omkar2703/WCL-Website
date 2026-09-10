import { ExternalLink } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import GlassCard from '../components/common/GlassCard.jsx'

export default function DroughtMonitor() {
  return (
    <>
      <PageHeader
        title="India Drought Monitor"
        description="Real-time drought conditions and forecasts across India, updated daily."
      >
        <a
          href="https://indiadroughtmonitor.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal-deep dark:text-teal"
        >
          Open indiadroughtmonitor.in directly <ExternalLink size={14} />
        </a>
      </PageHeader>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <GlassCard className="p-2 overflow-hidden">
          {/* Live embed of the lab's own drought-monitoring platform. The
              backend also exposes GET /api/drought, a light server-side
              proxy/cache in front of the same site -- useful once this page
              needs to render specific figures (e.g. this week's D0-D4 map)
              instead of the full embedded site. See server/routes/drought.js. */}
          <iframe
            src="https://indiadroughtmonitor.in/"
            title="India Drought Monitor"
            className="w-full h-[75vh] rounded-row border-0"
            loading="lazy"
          />
        </GlassCard>
        <p className="mt-4 text-xs text-slate400 max-w-[70ch]">
          Data and maps above are served live from indiadroughtmonitor.in, a platform
          maintained by the Water &amp; Climate Lab. If the embed doesn't load in your
          browser, use the direct link above.
        </p>
      </div>
    </>
  )
}
