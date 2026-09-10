import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`relative flex h-9 w-16 items-center rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 px-1 transition-colors ${className}`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-bgdark shadow-sm transition-transform duration-300 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? <Moon size={14} className="text-teal" /> : <Sun size={14} className="text-amber-deep" />}
      </span>
    </button>
  )
}
