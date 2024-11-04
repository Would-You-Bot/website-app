'use client'

import { useState, useEffect } from 'react'
import { useCookies } from './useCookies'

export interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export const useCookiePreferences = () => {
  const cookies = useCookies()
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
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
  }

  return {
    cookiePreferences,
    setCookiePreferences,
    showBanner,
    setShowBanner,
    savePreferences
  }
}
