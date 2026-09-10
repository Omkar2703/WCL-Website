import PageHeader from '../components/common/PageHeader.jsx'
import { GrantsAndFundsData } from '../data/GrantsAndFundsData.js'

export default function Collaborators() {
  const agencies = [...new Set(GrantsAndFundsData.map((g) => g.Agency))]

  return (
    <>
      <PageHeader
        title="Collaborators & funding"
        description="Government agencies, ministries and research programmes that have supported the lab's work over the years."
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-2.5 mb-10">
          {agencies.map((a) => (
            <span key={a} className="text-xs px-3.5 py-1.5 rounded-full glass text-ink/80 dark:text-paper/80">
              {a}
            </span>
          ))}
        </div>

        <ul className="space-y-4 pb-20">
          {GrantsAndFundsData.map((g, i) => (
            <li key={i} className="glass rounded-row p-5">
              <p className="text-sm text-ink/85 dark:text-paper/85 leading-relaxed">{g.Title}</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate400">
                <span>{g.Agency}</span>
                <span>PI: {g.ProjectInvestigator}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
