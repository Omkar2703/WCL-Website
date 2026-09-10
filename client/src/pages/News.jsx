import { CalendarDays, ExternalLink } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import { NewsData } from '../data/NewsData.js'
import { useApiOrLocal } from '../hooks/useApiOrLocal.js'

export default function News() {
  const { data: news } = useApiOrLocal('/news', NewsData)

  return (
    <>
      <PageHeader
        title="News"
        description="Coverage of the lab's research in the press, updated as new pieces come out."
      />
      <div className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 gap-4">
        {news.map((item, i) => (
          <a
            key={i}
            href={item.ArticleLink}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-row p-5 flex flex-col gap-2 hover:shadow-glow transition-shadow"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate400">
              <CalendarDays size={13} />
              {item.Date}, {item.SourceName?.trim()}
            </div>
            <p className="text-sm text-ink/85 dark:text-paper/85 leading-snug flex-1">{item.ArticleName}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-deep dark:text-teal">
              Read article <ExternalLink size={12} />
            </span>
          </a>
        ))}
      </div>
    </>
  )
}
