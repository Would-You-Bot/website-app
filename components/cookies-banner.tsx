'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import {
  useCookiePreferences,
  CookiePreferences
} from '@/helpers/hooks/useCookiesPreferences'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function CookieBanner() {
  const {
    cookiePreferences,
    setCookiePreferences,
    showBanner,
    setShowBanner,
    savePreferences
  } = useCookiePreferences()
  const [showModal, setShowModal] = useState(false)

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    }
    savePreferences(allPreferences)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    setShowModal(false)
    setShowBanner(false)
    savePreferences(cookiePreferences)
  }

  if (!showBanner) return null

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

      <Dialog
        open={showModal}
        onOpenChange={setShowModal}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Customize your cookie preferences here. You can enable or disable
              different categories of cookies.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {Object.entries(cookiePreferences).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between"
              >
                <Label
                  htmlFor={key}
                  className="capitalize"
                >
                  {key}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setCookiePreferences((prev: CookiePreferences) => ({
                      ...prev,
                      [key]: checked
                    }))
                  }
                  disabled={key === 'necessary'}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={handleSavePreferences}>Save preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
