'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { CookiePreferences } from '@/helpers/hooks/useCookies'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface CookieDialogProps {
  preferences: CookiePreferences
  onSave: (preferences: CookiePreferences) => void
  onClose: () => void
  open: boolean
  revokePermissions: () => void
}

export function CookieDialog({
  preferences,
  onSave,
  onClose,
  open,
  revokePermissions
}: CookieDialogProps) {
  const [localPreferences, setLocalPreferences] = useState(preferences)

  const handleRevokePermissions = () => {
    revokePermissions()
    onClose()
  }

  const handleSavePreferences = () => {
    onSave(localPreferences)
    onClose()
  }

  const preferenceDescriptions: Record<keyof CookiePreferences, string> = {
    necessary: 'All the necessary cookies needed to run the website.',
    analytics: 'Optional analytics used to enhance your analytics.'
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Customize your cookie preferences here. You can enable or disable
            different categories of cookies.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(localPreferences).map(
            ([key, value]: [string, boolean]) => (
              <div
                key={key}
                className="flex gap-2 items-center justify-between"
              >
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor={key}
                    className="capitalize"
                  >
                    {key}
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {preferenceDescriptions[key as keyof CookiePreferences]}
                  </span>
                </div>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setLocalPreferences((prev) => ({
                      ...prev,
                      [key]: checked
                    }))
                  }
                  disabled={key === 'necessary'}
                  className="data-[state=checked]:bg-brand-customPrimary"
                />
              </div>
            )
          )}
        </div>
        <DialogFooter>
          <Button
            className="bg-brand-blue-100 hover:bg-brand-blue-200 text-white"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
