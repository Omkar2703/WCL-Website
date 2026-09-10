import { Link } from 'react-router-dom'
import Logo from '../common/Logo.jsx'

const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      ['Research Areas', '/research-areas'],
      ['People', '/people'],
      ['Publications', '/publications'],
      ['Datasets', '/datasets']
    ]
  },
  {
    heading: 'Lab',
    links: [
      ['Collaborators & Funding', '/collaborators'],
      ['News', '/news'],
      ['Products', '/products'],
      ['India Drought Monitor', '/drought-monitor']
    ]
  },
  {
    heading: 'Connect',
    links: [
      ['Reach Out', '/contact'],
      ['Admin login', '/admin/login']
    ]
  }
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          
        </div>
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="text-sm font-medium mb-3">{col.heading}</h4>
            <ul className="space-y-2">
              {col.links.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate400 hover:text-teal-deep dark:hover:text-teal transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 dark:border-white/10 px-6 py-5 text-xs text-slate400 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Water & Climate Lab, IIT Gandhinagar.</span>
        <span>IIT Gandhinagar, Gujarat, India</span>
      </div>
    </footer>
  )
}
