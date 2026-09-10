export function slugify(str = '') {
  return str
    .toLowerCase()
    .replace(/^(prof\.|dr\.|mr\.|ms\.|mrs\.)\s*/i, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
