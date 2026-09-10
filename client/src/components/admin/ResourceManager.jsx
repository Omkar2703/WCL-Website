import { useEffect, useState } from 'react'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import api from '../../api/axios.js'

// Generic admin CRUD panel driven by a field schema, so adding a new
// manageable resource (e.g. a Datasets manager) is just another
// `<ResourceManager endpoint="/datasets" fields={[...]} titleField="DataName" />`
// call in AdminDashboard.jsx -- no new component needed.
export default function ResourceManager({ endpoint, fields, titleField }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [form, setForm] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ''])))
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api
      .get(endpoint)
      .then((res) => { setItems(res.data); setLoadError(false) })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }

  useEffect(load, [endpoint])

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post(endpoint, form)
      setForm(Object.fromEntries(fields.map((f) => [f.name, ''])))
      load()
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`)
    load()
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
      <form onSubmit={submit} className="glass rounded-hero p-6 space-y-4 h-fit">
        <h3 className="text-sm font-medium">Add new</h3>
        {fields.map((f) => (
          <div key={f.name}>
            <label className="block text-xs text-slate400 mb-1.5">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                rows={3}
                value={form[f.name]}
                onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                className="w-full rounded-row bg-black/[0.03] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-3 py-2 text-sm outline-none focus:border-teal resize-none"
              />
            ) : (
              <input
                type={f.type || 'text'}
                value={form[f.name]}
                onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                className="w-full rounded-row bg-black/[0.03] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-3 py-2 text-sm outline-none focus:border-teal"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-teal text-bgdark px-5 py-2.5 text-sm font-medium hover:bg-teal-soft disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
          Publish
        </button>
      </form>

      <div className="glass rounded-hero p-6">
        <h3 className="text-sm font-medium mb-4">Published ({items.length})</h3>
        {loading && <p className="text-sm text-slate400">Loading…</p>}
        {loadError && (
          <p className="text-sm text-amber-deep dark:text-amber">
            Couldn't reach the API for this collection -- confirm the server is
            running and MONGO_URI is set (see server/.env.example).
          </p>
        )}
        <ul className="space-y-2 max-h-[420px] overflow-y-auto slim-scroll">
          {items.map((item) => (
            <li key={item._id} className="flex items-center justify-between gap-3 rounded-row bg-black/[0.02] dark:bg-white/[0.04] px-3.5 py-2.5 text-sm">
              <span className="truncate">{item[titleField]}</span>
              <button onClick={() => remove(item._id)} aria-label="Delete" className="shrink-0 text-slate400 hover:text-amber-deep dark:hover:text-amber">
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
