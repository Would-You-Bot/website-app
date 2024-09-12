'use client'

import { ClusterCardsListSkeleton } from './_components/ClusterCardsListSkeleton'
import { ClusterCardsList } from './_components/ClusterCardsList'
import { clusterData2 } from '@/data/cluster-data'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Would You - Status'
// }

// Formula to calculate the shardid from the guild id
// shard_id = (guild_id >> 22) % num_shards
// Might need to be moved to a simple api route to be used in the frontend
const shardFromGuild = (guildId: string, numShards: number) =>
  (parseInt(guildId) >> 22) % numShards

const Status = () => {
  //  const cluster = await fetch(
  //    process.env.API_URL!,
  //    {
  //      method: 'GET',
  //      headers: {
  //        Authorization: process.env.API_KEY!,
  //      },
  //      cache: 'no-cache',
  //    },
  //  )

  //  const clusterData = await cluster.json()

  const [guildId, setGuildId] = useState('')
  const [filteredClusterData, setFilteredClusterData] = useState(clusterData2)

  useEffect(() => {
    if (guildId.length > 0) {
      const numShards = clusterData2.flat().length
      const shardId = shardFromGuild(guildId, numShards)
      const newFilteredClusterData = clusterData2.map((cluster) =>
        cluster.map((shard) => {
          if (shard.id === shardId) {
            return { ...shard, selected: true }
          }
          return shard
        })
      )
      setFilteredClusterData(newFilteredClusterData)
    } else {
      setFilteredClusterData(clusterData2)
    }
  }, [guildId])

  const areSystemsDegraded = clusterData2.some((cluster) =>
    cluster.some((shard) => shard.status !== 0)
  )

  return (
    <>
      <main className="w-full mx-auto max-w-8xl px-8">
        <div className="flex flex-wrap gap-6 justify-between">
          <h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
            Status
          </h1>
          <div className="flex items-center bg-secondary rounded-xl px-3">
            <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
            <input
              type="text"
              placeholder="Guild ID"
              onChange={(e) => setGuildId(e.target.value)}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        {areSystemsDegraded && (
          <span className="flex mt-8 py-4 px-6 rounded-2xl bg-status-yellow/25 border border-status-yellow/25 w-fit">
            Some systems are degraded
          </span>
        )}
        <div className="mt-8 flex flex-col gap-4">
          {clusterData2.length > 0 ?
            <ClusterCardsList data={filteredClusterData} />
          : <ClusterCardsListSkeleton />}
        </div>
      </main>
    </>
  )
}

export default Status
