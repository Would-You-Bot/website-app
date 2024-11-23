import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, MessageCircle, Heart } from 'lucide-react'

interface EditProfileProps {
  description: string | null;
  votePrivacy: boolean;
  onDescriptionChange: (value: string) => void;
  onPrivacyToggle: (setting: 'profilePrivacy' | 'votePrivacy' | 'likedPacksPrivacy') => void;
}

export function EditProfile({ description, votePrivacy, onDescriptionChange, onPrivacyToggle }: EditProfileProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Edit Profile</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <Textarea
              id="description"
              value={description || ''}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Privacy Settings</h3>
            <div className="space-y-4 rounded-lg border p-4 bg-muted">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-foreground" />
                  <Label htmlFor="profile-privacy" className="text-foreground">Profile Privacy</Label>
                </div>
                <Switch
                  id="profile-privacy"
                  checked={false}
                  onCheckedChange={() => onPrivacyToggle('profilePrivacy')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-foreground" />
                  <Label htmlFor="vote-privacy" className="text-foreground">Vote Privacy</Label>
                </div>
                <Switch
                  id="vote-privacy"
                  checked={votePrivacy}
                  onCheckedChange={() => onPrivacyToggle('votePrivacy')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-foreground" />
                  <Label htmlFor="liked-packs-privacy" className="text-foreground">Liked Packs Privacy</Label>
                </div>
                <Switch
                  id="liked-packs-privacy"
                  checked={false}
                  onCheckedChange={() => onPrivacyToggle('likedPacksPrivacy')}
                />
              </div>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}

