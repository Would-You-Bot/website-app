import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GamepadIcon, Languages } from 'lucide-react'

interface UserCardProps {
  userData: {
    bannerUrl: string;
    avatarUrl: string;
    displayName: string;
    globalName: string;
    description: string | null;
    createdAt: string;
    language: string;
  }
}

export function UserCard({ userData }: UserCardProps) {
  return (
    <Card className="border shadow-sm h-fit">
      <CardContent className="p-4">
        <div className="relative">
          <div className="h-20 rounded-lg overflow-hidden bg-gradient-to-r from-gray-200 to-gray-300">
            {userData.bannerUrl && (
              <Image
                alt="Profile banner"
                className="w-full h-full object-cover"
                src={userData.bannerUrl}
                height={80}
                width={280}
              />
            )}
          </div>
          <Avatar className="absolute -bottom-4 left-4 w-16 h-16 border-4 border-background">
            <AvatarImage src={userData.avatarUrl} />
            <AvatarFallback>{userData.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-12">
          <h1 className="text-xl font-bold text-foreground">{userData.displayName}</h1>
          <p className="text-sm text-muted-foreground">@{userData.globalName}</p>
          <p className="text-sm text-foreground mt-1">{userData.description}</p>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2 text-sm text-foreground">
          <div className="flex items-center gap-2">
            <GamepadIcon className="w-4 h-4" />
            <span>Joined {new Date(userData.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            <span>{userData.language}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

