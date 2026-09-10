import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 py-32 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">404</h1>
      <p className="mt-3 text-slate400">This page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block text-sm font-medium text-teal-deep dark:text-teal">
        Back to home
      </Link>
    </div>
  )
}
