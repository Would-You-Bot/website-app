"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCard } from "@/components/Profile/user-card"
import { StatsOverview } from "@/components/Profile/stats-overview"
import { GameStats } from "@/components/Profile/game-stats"
import { PackList } from "@/components/Profile/pack-list"
import { Achievements } from "@/components/Profile/achievements"
import { EditProfile } from "@/components/Profile/edit-profile"

interface UserData {
  wouldyourather: GameStats;
  neverhaveiever: GameStats;
  higherlower: HigherLowerStats;
  whatwouldyoudo: GameStats;
  truth: UsageStats;
  dare: UsageStats;
  random: UsageStats;
  topic: null;
  id: string;
  userID: string;
  votePrivacy: boolean;
  language: string;
  avatarUrl: string;
  bannerUrl: string;
  description: string | null;
  displayName: string;
  globalName: string;
  createdAt: string;
  updatedAt: string;
}

interface GameStats {
  yes: number;
  no: number;
  used: UsageStats;
  highscore: number | null;
}

interface HigherLowerStats {
  yes: number;
  no: number;
  used: UsageStats;
  highscore: number;
}

interface UsageStats {
  command: number;
  replay: number;
}

// Pseudo data for liked and created packs
const likedPacks = [
  { id: 1, name: "Classic Would You Rather", questions: 50, likes: 1200, type: "WOULDYOURATHER" },
  { id: 2, name: "Extreme Dares", questions: 30, likes: 800, type: "DARE" },
  { id: 3, name: "Deep Truths", questions: 40, likes: 950, type: "TRUTH" },
]

const createdPacks = [
  { id: 4, name: "My Custom WYR", questions: 25, likes: 150, type: "WOULDYOURATHER" },
  { id: 5, name: "Friend Group Inside Jokes", questions: 20, likes: 50, type: "NEVERHAVEIEVER" },
]

const achievements = [
  { title: "Game Master", desc: "Played 1000+ games", progress: 75, icon: "🏆" },
  { title: "Truth Seeker", desc: "Asked 100+ truths", progress: 85, icon: "🔍" },
  { title: "Daredevil", desc: "Completed 50+ dares", progress: 60, icon: "🎭" },
  { title: "Decision Maker", desc: "Made 200+ choices", progress: 45, icon: "🤔" },
]

export default function ProfileContent({ userData, canEdit }: { userData: UserData, canEdit: boolean }) {
  const [description, setDescription] = useState(userData.description)

  const totalGamesPlayed = 
    userData.wouldyourather.used.command + 
    userData.neverhaveiever.used.command + 
    userData.whatwouldyoudo.used.command + 
    userData.higherlower.used.command + 
    userData.truth.command + 
    userData.dare.command + 
    userData.random.command

  const totalYes = 
    userData.wouldyourather.yes + 
    userData.neverhaveiever.yes + 
    userData.whatwouldyoudo.yes

  const totalNo = 
    userData.wouldyourather.no + 
    userData.neverhaveiever.no + 
    userData.whatwouldyoudo.no

  function handlePrivacyToggle(setting: 'profilePrivacy' | 'votePrivacy' | 'likedPacksPrivacy') {
    // Handle privacy toggle
  }

  return (
    <main className="w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <UserCard userData={userData} />

        <div className="space-y-6">
          <Tabs defaultValue="statistics" className="w-full">
            <TabsList className="w-full justify-start h-auto p-1 rounded-lg flex flex-wrap ">
              <TabsTrigger value="statistics" className="rounded-md data-[state=active]:text-brand-blue-100">Statistics</TabsTrigger>
              <TabsTrigger value="liked" className="rounded-md data-[state=active]:text-brand-blue-100">Liked Packs</TabsTrigger>
              <TabsTrigger value="created" className="rounded-md data-[state=active]:text-brand-blue-100">Created Packs</TabsTrigger>
              <TabsTrigger value="achievements" className="rounded-md data-[state=active]:text-brand-blue-100">Achievements</TabsTrigger>
              {canEdit && <TabsTrigger value="edit" className="rounded-md data-[state=active]:text-brand-blue-100">Edit Profile</TabsTrigger>}
            </TabsList>

            <TabsContent value="statistics" className="mt-6">
              <div className="space-y-6">
                <StatsOverview
                  totalGamesPlayed={totalGamesPlayed}
                  highScore={userData.higherlower.highscore}
                  totalYes={totalYes}
                  totalNo={totalNo}
                />
                <GameStats
                  wouldYouRather={userData.wouldyourather}
                  neverHaveIEver={userData.neverhaveiever}
                  whatWouldYouDo={userData.whatwouldyoudo}
                  higherLower={userData.higherlower}
                />
              </div>
            </TabsContent>

            <TabsContent value="liked" className="mt-6">
              <PackList packs={likedPacks} type="liked" />
            </TabsContent>

            <TabsContent value="created" className="mt-6">
              <PackList packs={createdPacks} type="created" />
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <Achievements achievements={achievements} />
            </TabsContent>
            {canEdit && (
              <TabsContent value="edit" className="mt-6">
                <EditProfile
                  description={description}
                  votePrivacy={userData.votePrivacy}
                  onDescriptionChange={setDescription}
                  onPrivacyToggle={handlePrivacyToggle}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </main>
  )
}

