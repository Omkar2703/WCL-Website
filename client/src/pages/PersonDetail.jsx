import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react'
import { PeopleData } from '../data/PeopleData.js'
import { PublicationsData } from '../data/PublicationsData.js'
import { avatarDataUri } from '../utils/placeholders.js'
import { slugify } from '../utils/slug.js'
import GlassCard from '../components/common/GlassCard.jsx'

const SOCIAL_LABELS = {
  GoogleScholar: 'Google Scholar',
  ResearchGate: 'ResearchGate',
  Linkedin: 'LinkedIn',
  Twitter: 'Twitter / X',
  PortfolioWebsite: 'Website'
}

export default function PersonDetail() {
  const { slug } = useParams()
  const person = PeopleData.find((p) => slugify(p.Name) === slug)

  // Best-effort match against the publications list: the dataset stores
  // authors as "Surname, Initial." strings, so match on last name.
  const lastName = person?.Name.replace(/^(Prof\.|Dr\.)\s*/i, '').trim().split(/\s+/).pop()
  const publications = useMemo(() => {
    if (!lastName) return []
    return PublicationsData.filter((pub) =>
      pub.Authors?.some((a) => a.toLowerCase().startsWith(lastName.toLowerCase()))
    )
  }, [lastName])

  if (!person) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-slate400">We couldn't find that profile.</p>
        <Link to="/people" className="text-teal-deep dark:text-teal text-sm mt-3 inline-block">
          Back to People
        </Link>
      </div>
    )
  }

  const socials = Object.entries(person.SocialLinks || {}).filter(([, url]) => url)

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <Link to="/people" className="inline-flex items-center gap-1.5 text-sm text-slate400 hover:text-teal-deep dark:hover:text-teal mb-8">
        <ArrowLeft size={15} /> Back to People
      </Link>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <div>
          <img
            src={person.Image || avatarDataUri(person.Name)}
            alt={person.Name}
            className="w-full aspect-square object-cover rounded-hero"
          />
          <div className="mt-4 space-y-2">
            <a href={`mailto:${person.Email}`} className="flex items-center gap-2 text-xs text-slate400 hover:text-teal-deep dark:hover:text-teal break-all">
              <Mail size={13} /> {person.Email}
            </a>
            {socials.map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate400 hover:text-teal-deep dark:hover:text-teal">
                <ExternalLink size={13} /> {SOCIAL_LABELS[key] || key}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{person.Name}</h1>
          <p className="text-teal-deep dark:text-teal mt-1">{person.Programme}</p>
          <p className="text-sm text-slate400 mt-1">{person.Department}</p>
          <p className="mt-5 text-ink/80 dark:text-paper/80 leading-relaxed max-w-[70ch]">
            {person.ResearchInterests}
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {person.Education?.length > 0 && (
              <GlassCard className="p-5">
                <h3 className="text-sm font-medium mb-3">Education</h3>
                <ul className="space-y-2 text-sm text-ink/75 dark:text-paper/75 list-disc pl-4">
                  {person.Education.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </GlassCard>
            )}
            {person.Researchs?.length > 0 && (
              <GlassCard className="p-5">
                <h3 className="text-sm font-medium mb-3">Research focus</h3>
                <ul className="space-y-2 text-sm text-ink/75 dark:text-paper/75 list-disc pl-4">
                  {person.Researchs.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </GlassCard>
            )}
            {person.Achievements?.length > 0 && (
              <GlassCard className="p-5 sm:col-span-2">
                <h3 className="text-sm font-medium mb-3">Achievements</h3>
                <ul className="space-y-2 text-sm text-ink/75 dark:text-paper/75 list-disc pl-4 columns-1 sm:columns-2 gap-x-8">
                  {person.Achievements.map((a, i) => <li key={i} className="break-inside-avoid">{a}</li>)}
                </ul>
              </GlassCard>
            )}
          </div>

          {publications.length > 0 && (
            <div className="mt-10">
              <h3 className="font-display font-semibold mb-4">Publications ({publications.length})</h3>
              <ul className="space-y-3">
                {publications.map((pub, i) => (
                  <li key={i} className="text-sm text-ink/75 dark:text-paper/75 leading-relaxed border-l-2 border-teal/40 pl-3">
                    {pub.PublicationTitle}{' '}
                    <a href={pub.PublicationLink} target="_blank" rel="noreferrer" className="text-teal-deep dark:text-teal">
                      (link)
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
