'use client'

import { useCookiePreferences } from '@/helpers/hooks/useCookies'

export function PlausibleScript() {
  const cookies = useCookiePreferences()
  const analytics = cookies.cookiePreferences.analytics

  if (!analytics) return null

  return (
    <script
      defer
      data-domain="wouldyoubot.gg"
      src="https://stats.wouldyoubot.gg/js/script.js"
    />
  )
}
