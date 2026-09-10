import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader.jsx'
import Tabs from '../components/common/Tabs.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import { ResearchAreasData } from '../data/ResearchAreasData.js'
import { topicSwatch } from '../utils/placeholders.js'

export default function ResearchAreas() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const active = useMemo(
    () => ResearchAreasData.find((a) => a.PageLink === slug) || ResearchAreasData[0],
    [slug]
  )

  useEffect(() => {
    if (!slug) navigate(`/research-areas/${ResearchAreasData[0].PageLink}`, { replace: true })
  }, [slug, navigate])

  const paragraphs = [active.Para1, active.Para2, active.Para3, active.Para4].filter(Boolean)
  const questions = Array.isArray(active.Questions) ? active.Questions : []
  const papers = Array.isArray(active.RelatedPapers) ? active.RelatedPapers : []

  return (
    <>
      <PageHeader
        title="Research areas"
        description="Four connected threads -- from real-time monitoring to long-range climate risk -- that together describe how the lab studies India's water cycle."
      />
      <div className="max-w-6xl mx-auto px-6">
        <Tabs
          tabs={ResearchAreasData.map((a) => a.Title)}
          active={active.Title}
          onChange={(title) => {
            const area = ResearchAreasData.find((a) => a.Title === title)
            navigate(`/research-areas/${area.PageLink}`)
          }}
        />

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 py-12">
          <div>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-ink/80 dark:text-paper/80 leading-relaxed max-w-[70ch] mb-5 whitespace-pre-line">
                {p}
              </p>
            ))}

            {questions.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display font-semibold mb-3">Open questions we're working on</h3>
                <ul className="space-y-3">
                  {questions.map((q, i) => (
                    <li key={i} className="text-sm text-ink/75 dark:text-paper/75 leading-relaxed pl-4 border-l-2 border-amber/50">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-hero overflow-hidden glass h-48">
              <img
                src={active.Image || topicSwatch(active.Title)}
                alt={active.Title}
                className="w-full h-full object-cover"
              />
            </div>

            {active.KeyTopics?.length > 0 && (
              <GlassCard className="p-5">
                <h4 className="text-sm font-medium mb-3">Key topics</h4>
                <div className="flex flex-wrap gap-2">
                  {active.KeyTopics.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-teal/10 text-teal-deep dark:text-teal">
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            )}

            {papers.length > 0 && (
              <GlassCard className="p-5">
                <h4 className="text-sm font-medium mb-3">Related papers</h4>
                <ul className="space-y-2.5">
                  {papers.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate400 hover:text-teal-deep dark:hover:text-teal break-all leading-relaxed"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
