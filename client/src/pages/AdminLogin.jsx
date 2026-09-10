import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/admin')
    } catch (err) {
      setStatus('idle')
      setError(err.response?.data?.message || 'Could not sign in -- check your credentials.')
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <div className="glass rounded-hero p-8">
        <div className="h-11 w-11 rounded-full bg-teal/15 flex items-center justify-center mb-5">
          <Lock size={18} className="text-teal-deep dark:text-teal" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin login</h1>
        <p className="mt-2 text-sm text-slate400">
          Manage news, updates, people, and publications for the lab site.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs text-slate400 mb-1.5">Email</label>
            <input
              id="email" type="email" required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-row bg-black/[0.03] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs text-slate400 mb-1.5">Password</label>
            <input
              id="password" type="password" required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full rounded-row bg-black/[0.03] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
            />
          </div>

          {error && <p className="text-sm text-amber-deep dark:text-amber">{error}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-teal text-bgdark px-6 py-3 text-sm font-medium hover:bg-teal-soft transition-colors disabled:opacity-60"
          >
            {status === 'sending' && <Loader2 size={16} className="animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
