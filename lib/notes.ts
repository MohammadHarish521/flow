export const categories = [
  'Work',
  'Travel',
  'Projects',
  'Personal',
  'Education',
  'Finance',
  'Ideas',
] as const

export type Category = (typeof categories)[number]

export interface Note {
  id: string
  category: Category
  title: string
  description: string
  timestamp: string
  isFavorite: boolean
}

export const categoryColors: Record<Category, { light: string; accent: string }> = {
  Work: { light: 'bg-(--color-purple-light)', accent: 'text-(--color-work-accent)' },
  Travel: { light: 'bg-(--color-peach-light)', accent: 'text-(--color-travel-accent)' },
  Projects: { light: 'bg-(--color-green-light)', accent: 'text-(--color-projects-accent)' },
  Personal: { light: 'bg-(--color-blue-light)', accent: 'text-(--color-personal-accent)' },
  Education: { light: 'bg-(--color-blue-light)', accent: 'text-(--color-education-accent)' },
  Finance: { light: 'bg-(--color-pink-light)', accent: 'text-(--color-finance-accent)' },
  Ideas: { light: 'bg-(--color-peach-light)', accent: 'text-(--color-ideas-accent)' },
}

export type NoteRow = {
  id: string
  category: string | null
  title: string
  description: string
  created_at: string
  is_favorite: boolean
}

const categorySet = new Set<string>(categories)

function isCategory(value: string | null): value is Category {
  return value !== null && categorySet.has(value)
}

export function formatTimeAgo(date: Date, now = new Date()): string {
  const diffMs = Math.max(0, now.getTime() - date.getTime())
  const diffSeconds = Math.floor(diffMs / 1000)

  if (diffSeconds < 45) return 'just now'
  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`
  const diffYears = Math.floor(diffMonths / 12)
  return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`
}

export function mapNoteRowToNote(row: NoteRow): Note {
  const category = isCategory(row.category) ? row.category : 'Ideas'
  const createdAt = new Date(row.created_at)

  return {
    id: row.id,
    category,
    title: row.title,
    description: row.description,
    timestamp: Number.isNaN(createdAt.getTime())
      ? 'just now'
      : formatTimeAgo(createdAt),
    isFavorite: row.is_favorite,
  }
}
