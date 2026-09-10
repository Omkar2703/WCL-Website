import { useState } from 'react'
import { Loader2, Mail, MapPin, Send } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import api from '../api/axios.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.post('/contact', form)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader
        title="Reach out"
        description="Questions about our data, collaboration proposals, or media enquiries -- send us a note and we'll get back to you."
      />
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-[1fr_1.3fr] gap-8">
        <div className="space-y-4">
          <GlassCard className="p-6">
            <Mail size={18} className="text-teal-deep dark:text-teal mb-3" />
            <h3 className="text-sm font-medium">Email</h3>
            <a href="mailto:vmishra@iitgn.ac.in" className="text-sm text-slate400 hover:text-teal-deep dark:hover:text-teal">
              vmishra@iitgn.ac.in
            </a>
          </GlassCard>
          <GlassCard className="p-6">
            <MapPin size={18} className="text-amber-deep dark:text-amber mb-3" />
            <h3 className="text-sm font-medium">Address</h3>
            <p className="text-sm text-slate400 leading-relaxed">
              Civil Engineering Department, IIT Gandhinagar, Palaj, Gandhinagar, Gujarat 382355, India
            </p>
          </GlassCard>
        </div>

        <form onSubmit={submit} className="glass rounded-hero p-7 space-y-5">
          <div>
            <label className="block text-xs text-slate400 mb-1.5" htmlFor="name">Name</label>
            <input
              id="name" required value={form.name} onChange={update('name')}
              className="w-full rounded-row bg-black/[0.03] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
            />
          </div>
          <div>
            <label className="block text-xs text-slate400 mb-1.5" htmlFor="email">Email</label>
            <input
              id="email" type="email" required value={form.email} onChange={update('email')}
              className="w-full rounded-row bg-black/[0.03] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
            />
          </div>
          <div>
            <label className="block text-xs text-slate400 mb-1.5" htmlFor="message">Message</label>
            <textarea
              id="message" required rows={5} value={form.message} onChange={update('message')}
              className="w-full rounded-row bg-black/[0.03] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-full bg-teal text-bgdark px-6 py-3 text-sm font-medium hover:bg-teal-soft transition-colors disabled:opacity-60"
          >
            {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Send message
          </button>

          {status === 'sent' && (
            <p className="text-sm text-teal-deep dark:text-teal">Sent. We'll reply by email soon.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-amber-deep dark:text-amber">
              The message service isn't reachable right now -- please email us directly instead.
            </p>
          )}
        </form>
      </div>
    </>
  )
}
