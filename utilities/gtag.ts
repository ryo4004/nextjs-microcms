export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const EXIST_GA_ID = GA_ID !== ''
const EXIST_GTAG = typeof window !== 'undefined' && typeof window.gtag === 'function'

export const pageview = (path: string) => {
  if (EXIST_GTAG && EXIST_GA_ID && typeof GA_ID === 'string') {
    window.gtag('config', GA_ID, { page_path: path })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: string
}) => {
  if (EXIST_GTAG && EXIST_GA_ID && typeof GA_ID === 'string') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}
