import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as gtag from './gtag'

export default function usePageView() {
  const router = useRouter()
  useEffect(() => {
    if (!gtag.EXIST_GA_ID) {
      return
    }
    const handleRouteChange = (path: string) => {
      gtag.pageview(path)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
