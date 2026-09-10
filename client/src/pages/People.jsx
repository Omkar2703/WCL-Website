import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader.jsx'
import Tabs from '../components/common/Tabs.jsx'
import { PeopleData } from '../data/PeopleData.js'
import { avatarDataUri } from '../utils/placeholders.js'
import { slugify } from '../utils/slug.js'

const TABS = ['Current Members', 'Interns', 'Alumni', 'Photo Gallery']

function classify(person) {
  const c = (person.PageClassification || '').trim()
  if (c === 'Current') return 'Current Members'
  if (c === 'Intern') return 'Interns'
  if (c.startsWith('Alumni')) return 'Alumni'
  return null
}

function PersonCard({ person }) {
  return (
    <Link
      to={`/people/${slugify(person.Name)}`}
      className="glass rounded-hero p-5 flex flex-col hover:shadow-glow transition-shadow"
    >
      <img
        src={person.Image || avatarDataUri(person.Name)}
        alt={person.Name}
        className="h-20 w-20 rounded-full object-cover mb-4"
      />
      <h3 className="font-display font-semibold leading-snug">{person.Name}</h3>
      <p className="text-xs text-teal-deep dark:text-teal mt-1">{person.Programme}</p>
      <p className="text-xs text-slate400 mt-1">{person.Department}</p>
      <p className="text-sm text-ink/70 dark:text-paper/70 mt-3 line-clamp-3">
        {person.ResearchInterests}
      </p>
    </Link>
  )
}

export default function People() {
  const [tab, setTab] = useState(TABS[0])

  const professor = PeopleData.find((p) => p.PageClassification?.trim() === 'Professor')
  const filtered = useMemo(
    () => PeopleData.filter((p) => classify(p) === tab),
    [tab]
  )
  const gallery = useMemo(() => PeopleData.filter((p) => p.Image), [])

  return (
    <>
      <PageHeader
        title="People"
        description="The researchers, students and alumni behind the lab's work on hydrology, drought and flood risk."
      />

      {professor && (
        <div className="max-w-6xl mx-auto px-6 pb-10">
          <PersonCard person={professor} />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === 'Photo Gallery' ? (
          <div className="py-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {gallery.map((p) => (
              <Link key={p.Name} to={`/people/${slugify(p.Name)}`} className="group">
                <img
                  src={p.Image || avatarDataUri(p.Name)}
                  alt={p.Name}
                  className="w-full aspect-square object-cover rounded-row"
                />
                <p className="mt-1.5 text-xs text-slate400 group-hover:text-teal-deep dark:group-hover:text-teal truncate">
                  {p.Name}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length === 0 ? (
              <p className="text-sm text-slate400 col-span-full">No entries in this category yet.</p>
            ) : (
              filtered.map((p) => <PersonCard key={p.Name} person={p} />)
            )}
          </div>
        )}
      </div>
    </>
  )
}
