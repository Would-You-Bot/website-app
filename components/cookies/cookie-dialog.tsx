'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { CookiePreferences } from '@/helpers/hooks/useCookiesPreferences'
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

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
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
          {Object.entries(localPreferences).map(([key, value]) => (
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
                  setLocalPreferences((prev) => ({
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
          <Button
            variant="destructive"
            onClick={handleRevokePermissions}
          >
            Delete Cookies
          </Button>
          <Button onClick={handleSavePreferences}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
