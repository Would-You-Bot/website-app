'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import GreadientBackground from '@/components/gradient-background'
import Image from 'next/image'

export default function Profile() {
  return (
    <main className="flex items-center flex-1 mx-auto w-full max-w-8xl flex-col gap-8 px-8 mt-12">
      <ProfileCard />
    </main>
  )
}

const ProfileCard = () => {
  return (
    <div className="flex rounded-xl border-2 w-full max-w-64 min-h-96 p-2 relative overflow-hidden">
      <div className="w-full max-h-20 z-10">
        <Image
          src="https://images.unsplash.com/photo-1725205337190-34245db45424?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
          width={1920}
          height={1080}
          className="w-full h-full object-cover rounded-md select-none"
        />
        <div className="flex gap-2 items-center p-2 -translate-y-1/3">
          <Avatar className="w-16 h-16 border-4 border-popover select-none">
            <AvatarImage src="https://cdn.wouldyoubot.gg/staff/special/Paulos.webp" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="mt-3">@dpaulos6</span>
        </div>
      </div>
    </div>
  )
}
