'use client'

import { useIsClient } from '@/helpers/hooks/useIsClient'
import { useState, useEffect } from 'react'
import { useMemo } from 'react'

export function useCookies() {
  const isClient = useIsClient()
  const cookies_ = isClient ? window?.document?.cookie : ''

  return useMemo(() => {
    return cookies_.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=')
      acc.set(key.trim(), value)
      return acc
    }, new Map<string, string>())
  }, [cookies_])
}

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
}

export const useCookiePreferences = () => {
  const cookies = useCookies()
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    {
      necessary: true,
      analytics: false
    }
  )
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    const savedPreferences = cookies.get('cookiePreferences')
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences))
      setShowBanner(false)
    }
  }, [cookies])

  const savePreferences = (preferences: typeof cookiePreferences) => {
    setCookiePreferences(preferences)
    const expires = new Date(Date.now() + 365 * 864e5).toUTCString()
    document.cookie = `cookiePreferences=${JSON.stringify(preferences)}; expires=${expires}; path=/`

    window.location.reload()
  }

  return {
    cookiePreferences,
    setCookiePreferences,
    showBanner,
    setShowBanner,
    savePreferences
  }
}
