'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatsOverview } from '@/components/Profile/stats-overview'
import { Achievements } from '@/components/Profile/achievements'
import { EditProfile } from '@/components/Profile/edit-profile'
import { GameStats } from '@/components/Profile/game-stats'
import { UserCard } from '@/components/Profile/user-card'
import { PackList } from '@/components/Profile/pack-list'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface UserData {
  id: string
  userID?: string
  displayName: string
  avatarUrl?: string
  globalName?: string
  description?: string
  language?: string
  bannerUrl?: string
  votePrivacy?: boolean
  createdAt?: string
  updatedAt?: string
  wouldyourather?: GameStats
  neverhaveiever?: GameStats
  higherlower?: HigherLowerStats
  whatwouldyoudo?: GameStats
  truth?: UsageStats
  dare?: UsageStats
  random?: UsageStats
  topic?: null
}

interface GameStats {
  yes?: number
  no?: number
  used?: UsageStats
  highscore?: number | null
}

interface HigherLowerStats {
  yes?: number
  no?: number
  used?: UsageStats
  highscore?: number | null
}

interface UsageStats {
  command?: number
  replay?: number
}

// Pseudo data for liked and created packs
const likedPacks = [
  {
    id: 1,
    name: 'Classic Would You Rather',
    questions: 50,
    likes: 1200,
    type: 'WOULDYOURATHER'
  },
  { id: 2, name: 'Extreme Dares', questions: 30, likes: 800, type: 'DARE' },
  { id: 3, name: 'Deep Truths', questions: 40, likes: 950, type: 'TRUTH' }
]

const createdPacks = [
  {
    id: 4,
    name: 'My Custom WYR',
    questions: 25,
    likes: 150,
    type: 'WOULDYOURATHER'
  },
  {
    id: 5,
    name: 'Friend Group Inside Jokes',
    questions: 20,
    likes: 50,
    type: 'NEVERHAVEIEVER'
  }
]

const achievements = [
  {
    title: 'Game Master',
    desc: 'Played 1000+ games',
    progress: 75,
    icon: '🏆'
  },
  {
    title: 'Truth Seeker',
    desc: 'Asked 100+ truths',
    progress: 85,
    icon: '🔍'
  },
  { title: 'Daredevil', desc: 'Completed 50+ dares', progress: 60, icon: '🎭' },
  {
    title: 'Decision Maker',
    desc: 'Made 200+ choices',
    progress: 45,
    icon: '🤔'
  }
]

export default function ProfileContent({
  userData,
  canEdit
}: {
  userData: UserData
  canEdit: boolean
}) {
  const [description, setDescription] = useState(userData.description ?? '')
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || 'statistics'

  const totalGamesPlayed =
    (userData.wouldyourather?.used?.command ?? 0) +
    (userData.neverhaveiever?.used?.command ?? 0) +
    (userData.whatwouldyoudo?.used?.command ?? 0) +
    (userData.higherlower?.used?.command ?? 0) +
    (userData.truth?.command ?? 0) +
    (userData.dare?.command ?? 0) +
    (userData.random?.command ?? 0) +
    (userData.truth?.replay ?? 0) +
    (userData.dare?.replay ?? 0) +
    (userData.random?.replay ?? 0) +
    (userData.higherlower?.used?.replay ?? 0) +
    (userData.wouldyourather?.used?.replay ?? 0) +
    (userData.neverhaveiever?.used?.replay ?? 0) +
    (userData.whatwouldyoudo?.used?.replay ?? 0)

  const totalYes =
    (userData.wouldyourather?.yes ?? 0) +
    (userData.neverhaveiever?.yes ?? 0) +
    (userData.whatwouldyoudo?.yes ?? 0)

  const totalNo =
    (userData.wouldyourather?.no ?? 0) +
    (userData.neverhaveiever?.no ?? 0) +
    (userData.whatwouldyoudo?.no ?? 0)

  const handlePrivacyToggle = (
    setting: 'profilePrivacy' | 'votePrivacy' | 'likedPacksPrivacy'
  ) => {
    // Handle privacy toggle logic here
  }

  const hasGameStats = !!(
    userData.wouldyourather ||
    userData.neverhaveiever ||
    userData.whatwouldyoudo ||
    userData.higherlower
  )

  return (
    <main className="w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {userData.displayName && (
          <UserCard
            userData={{
              userID: userData.userID ?? '',
              bannerUrl: userData.bannerUrl ?? '',
              avatarUrl: userData.avatarUrl ?? '',
              displayName: userData.displayName,
              globalName: userData.globalName ?? '',
              description: userData.description ?? null,
              createdAt: userData.createdAt ?? '',
              language: userData.language ?? ''
            }}
          />
        )}

        <div className="space-y-6">
          <Tabs
            defaultValue={currentTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5">
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
              <TabsTrigger value="liked">Liked Packs</TabsTrigger>
              <TabsTrigger value="created">Created Packs</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              {canEdit && <TabsTrigger value="edit">Edit Profile</TabsTrigger>}
            </TabsList>
            <TabsContent value="statistics">
              <div className="space-y-6">
                <StatsOverview
                  totalGamesPlayed={totalGamesPlayed}
                  highScore={userData.higherlower?.highscore ?? 0}
                  totalYes={totalYes}
                  totalNo={totalNo}
                />
                {hasGameStats && (
                  <GameStats
                    wouldYouRather={
                      userData.wouldyourather ?
                        {
                          yes: userData.wouldyourather.yes ?? 0,
                          no: userData.wouldyourather.no ?? 0,
                          used: {
                            command: userData.wouldyourather.used?.command ?? 0,
                            replay: userData.wouldyourather.used?.replay ?? 0
                          }
                        }
                      : undefined
                    }
                    neverHaveIEver={
                      userData.neverhaveiever ?
                        {
                          yes: userData.neverhaveiever.yes ?? 0,
                          no: userData.neverhaveiever.no ?? 0,
                          used: {
                            command: userData.neverhaveiever.used?.command ?? 0,
                            replay: userData.neverhaveiever.used?.replay ?? 0
                          }
                        }
                      : undefined
                    }
                    whatWouldYouDo={
                      userData.whatwouldyoudo ?
                        {
                          yes: userData.whatwouldyoudo.yes ?? 0,
                          no: userData.whatwouldyoudo.no ?? 0,
                          used: {
                            command: userData.whatwouldyoudo.used?.command ?? 0,
                            replay: userData.whatwouldyoudo.used?.replay ?? 0
                          }
                        }
                      : undefined
                    }
                    higherLower={
                      userData.higherlower ?
                        {
                          yes: userData.higherlower.yes ?? 0,
                          no: userData.higherlower.no ?? 0,
                          used: {
                            command: userData.higherlower.used?.command ?? 0,
                            replay: userData.higherlower.used?.replay ?? 0
                          },
                          highscore: userData.higherlower.highscore ?? 0
                        }
                      : undefined
                    }
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="liked">
              <PackList
                packs={likedPacks}
                type="liked"
              />
            </TabsContent>
            <TabsContent value="created">
              <PackList
                packs={createdPacks}
                type="created"
              />
            </TabsContent>
            <TabsContent value="achievements">
              <Achievements achievements={achievements} />
            </TabsContent>
            {canEdit && (
              <TabsContent value="edit">
                <EditProfile
                  userId={userData.userID || ''}
                  description={userData.description || null}
                  votePrivacy={userData.votePrivacy || false}
                  profilePrivacy={false}
                  likedPacksPrivacy={false}
                  onDataRefresh={() => {
                    // Add logic to refresh user data here
                    console.log("Refreshing user data...")
                  }}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </main>
  )
}
