import { useEffect, useState } from 'react'
import api from '../api/axios.js'

// Admin-managed collections (news, recent updates, people, publications...)
// should ultimately be served from MongoDB via the Express API. Until a
// database is connected, every page keeps working off the bundled data file
// so the site is demoable without a backend. Swap this out for a plain
// `useEffect` + `api.get` once the API is live in every environment you
// deploy to, if you'd rather not carry the fallback long-term.
export function useApiOrLocal(endpoint, localData) {
  const [data, setData] = useState(localData)
  const [source, setSource] = useState('local')

  useEffect(() => {
    let cancelled = false
    api
      .get(endpoint)
      .then((res) => {
        if (!cancelled && Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data)
          setSource('api')
        }
      })
      .catch(() => {
        // Backend not reachable / not seeded yet -- local fallback stands.
      })
    return () => {
      cancelled = true
    }
  }, [endpoint])

  return { data, source }
}
