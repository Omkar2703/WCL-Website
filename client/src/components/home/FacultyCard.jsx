import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { PeopleData } from '../../data/PeopleData.js'
import { avatarDataUri } from '../../utils/placeholders.js'
import { slugify } from '../../utils/slug.js'

export default function FacultyCard() {
  const lead = PeopleData.find((p) => p.PageClassification?.trim() === 'Professor')
  if (!lead) return null

  return (
    <div className="glass rounded-hero p-6 h-full flex flex-col">
      <div className="flex items-center gap-4">
        <img
          src={lead.Image || avatarDataUri(lead.Name)}
          alt={lead.Name}
          className="h-16 w-16 rounded-full object-cover shrink-0"
        />
        <div>
          <h3 className="font-display font-semibold leading-tight">{lead.Name}</h3>
          <p className="text-sm text-slate400">{lead.Programme}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink/75 dark:text-paper/75 leading-relaxed">
        {lead.ResearchInterests}
      </p>
      <div className="mt-auto pt-5 flex items-center justify-between">
        <a
          href={`mailto:${lead.Email}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate400 hover:text-teal-deep dark:hover:text-teal"
        >
          <Mail size={13} />
          {lead.Email}
        </a>
        <Link
          to={`/people/${slugify(lead.Name)}`}
          className="text-xs font-medium text-teal-deep dark:text-teal"
        >
          Full profile
        </Link>
      </div>
    </div>
  )
}
