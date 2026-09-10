// The old site's data files reference local photo/logo assets that were not
// supplied with this project. Rather than break image slots, every avatar /
// figure falls back to a generated SVG (initials + a deterministic gradient
// picked from the palette). Swap in real files later by pointing the record's
// `Image` field at an imported asset -- no component changes needed.

const PALETTES = [
  ['#2DD4BF', '#0F766E'],
  ['#F2A93B', '#B4740E'],
  ['#38BDF8', '#0F1E33'],
  ['#5EEAD4', '#134E4A'],
  ['#FBCB83', '#0F1E33']
]

function hashString(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function initials(name = '') {
  const clean = name.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, '')
  const parts = clean.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function avatarDataUri(name = '?') {
  const [c1, c2] = PALETTES[hashString(name) % PALETTES.length]
  const label = initials(name)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="240" height="240" fill="url(#g)"/>
    <text x="50%" y="53%" font-family="Space Grotesk, sans-serif" font-size="88" fill="white" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function topicSwatch(seed = '?') {
  const [c1, c2] = PALETTES[hashString(seed) % PALETTES.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="480" height="320" fill="url(#g)"/>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
