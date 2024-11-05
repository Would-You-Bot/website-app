'use client'

import { useCookieContext } from './cookie-provider'
import { Button } from '@/components/ui/button'
import { CookieDialog } from './cookie-dialog'
import { useState, useEffect } from 'react'

export function CookieBanner() {
  const { setShowBanner, state, setPreferences, revokePermissions } =
    useCookieContext()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const cookieString = document.cookie
    const isCookiesSet = cookieString.includes('cookiePreferences=')
    setShowBanner(!isCookiesSet)
  }, [setShowBanner])

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    }
    setPreferences(allPreferences)
    setShowBanner(false)
  }

  if (!state.preferences.necessary) return null

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 bg-hover-light shadow-md z-50">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-8">
          <div className="text-sm">
            We use cookies to enhance your browsing experience and analyze our
            traffic.{' '}
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={() => setShowModal(true)}
            >
              Learn more
            </Button>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="h-10"
              onClick={() => setShowModal(true)}
            >
              Customize
            </Button>
            <Button
              className="h-10"
              onClick={handleAcceptAll}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <CookieDialog
        open={showModal}
        preferences={state.preferences}
        onSave={setPreferences}
        onClose={() => setShowModal(false)}
        revokePermissions={() => revokePermissions()}
      />
    </>
  )
}
