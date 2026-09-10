import { useEffect, useState } from 'react'
import { LogOut, Trash2 } from 'lucide-react'
import Tabs from '../components/common/Tabs.jsx'
import ResourceManager from '../components/admin/ResourceManager.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'

const TABS = ['News', 'Recent Updates', 'Datasets', 'Grants & Funds', 'Messages']

const NEWS_FIELDS = [
  { name: 'Date', label: 'Date (dd/mm/yy)' },
  { name: 'SourceName', label: 'Source' },
  { name: 'ArticleName', label: 'Headline' },
  { name: 'ArticleLink', label: 'Article URL' }
]
const UPDATE_FIELDS = [
  { name: 'Title', label: 'Title' },
  { name: 'ImageLink', label: 'Image URL' },
  { name: 'ArticleLink', label: 'Article URL' }
]
const DATASET_FIELDS = [
  { name: 'DataName', label: 'Dataset name' },
  { name: 'Description', label: 'Description', type: 'textarea' },
  { name: 'PaperLink', label: 'Paper URL' },
  { name: 'DataLink', label: 'Data download URL' }
]
const GRANT_FIELDS = [
  { name: 'Title', label: 'Project title', type: 'textarea' },
  { name: 'Agency', label: 'Funding agency' },
  { name: 'ProjectInvestigator', label: 'Principal investigator' }
]

function MessagesPanel() {
  const [messages, setMessages] = useState([])
  const [loadError, setLoadError] = useState(false)

  const load = () => {
    api.get('/contact').then((res) => setMessages(res.data)).catch(() => setLoadError(true))
  }
  useEffect(load, [])

  const remove = async (id) => {
    await api.delete(`/contact/${id}`)
    load()
  }

  return (
    <div className="glass rounded-hero p-6">
      <h3 className="text-sm font-medium mb-4">Contact form submissions ({messages.length})</h3>
      {loadError && (
        <p className="text-sm text-amber-deep dark:text-amber">
          Couldn't reach the API -- confirm the server is running and MONGO_URI is set.
        </p>
      )}
      <ul className="space-y-3">
        {messages.map((m) => (
          <li key={m._id} className="rounded-row bg-black/[0.02] dark:bg-white/[0.04] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{m.name} &lt;{m.email}&gt;</p>
                <p className="text-sm text-slate400 mt-1">{m.message}</p>
              </div>
              <button onClick={() => remove(m._id)} aria-label="Delete" className="shrink-0 text-slate400 hover:text-amber-deep dark:hover:text-amber">
                <Trash2 size={15} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const [tab, setTab] = useState(TABS[0])

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin dashboard</h1>
          <p className="text-sm text-slate400 mt-1">Signed in as {admin?.email || 'admin'}</p>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 text-sm text-slate400 hover:text-amber-deep dark:hover:text-amber"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      <div className="py-8">
        {tab === 'News' && <ResourceManager endpoint="/news" fields={NEWS_FIELDS} titleField="ArticleName" />}
        {tab === 'Recent Updates' && <ResourceManager endpoint="/updates" fields={UPDATE_FIELDS} titleField="Title" />}
        {tab === 'Datasets' && <ResourceManager endpoint="/datasets" fields={DATASET_FIELDS} titleField="DataName" />}
        {tab === 'Grants & Funds' && <ResourceManager endpoint="/grants" fields={GRANT_FIELDS} titleField="Title" />}
        {tab === 'Messages' && <MessagesPanel />}
      </div>
    </div>
  )
}
