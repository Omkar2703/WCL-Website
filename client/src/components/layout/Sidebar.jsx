import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  Home, Waves, Users, BookOpen, Handshake, Database,
  Newspaper, LayoutGrid, Mail, CloudDrizzle, X, ShieldCheck
} from 'lucide-react'
import Logo from '../common/Logo.jsx'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/research-areas', label: 'Research Areas', icon: Waves },
  { to: '/people', label: 'People', icon: Users },
  { to: '/publications', label: 'Publications', icon: BookOpen },
  { to: '/collaborators', label: 'Collaborators & Funding', icon: Handshake },
  { to: '/datasets', label: 'Datasets', icon: Database },
  { to: '/news', label: 'News', icon: Newspaper },
  { to: '/products', label: 'Products', icon: LayoutGrid },
  { to: '/drought-monitor', label: 'India Drought Monitor', icon: CloudDrizzle },
  { to: '/contact', label: 'Reach Out', icon: Mail }
]

export default function Sidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-bgdark/60 backdrop-blur-sm"
          />
          <motion.nav
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed top-0 left-0 z-50 h-full w-[290px] glass-strong flex flex-col"
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-black/5 dark:border-white/10">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto slim-scroll py-4 px-3 space-y-1">
              {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-row px-3.5 py-2.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-teal/15 text-teal-deep dark:text-teal font-medium'
                          : 'text-ink/80 dark:text-paper/80 hover:bg-black/5 dark:hover:bg-white/10'
                      }`
                    }
                  >
                    <Icon size={17} strokeWidth={2} />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="border-t border-black/5 dark:border-white/10 px-3 py-3">
              <NavLink
                to="/admin/login"
                onClick={onClose}
                className="flex items-center gap-2.5 rounded-row px-3.5 py-2 text-xs text-slate400 hover:text-teal-deep dark:hover:text-teal transition-colors"
              >
                <ShieldCheck size={15} />
                Admin login
              </NavLink>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
