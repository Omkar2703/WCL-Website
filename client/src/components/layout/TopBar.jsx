import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../common/Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function TopBar({ onOpenNav }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 glass">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNav}
            aria-label="Open navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Menu size={20} />
          </button>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
