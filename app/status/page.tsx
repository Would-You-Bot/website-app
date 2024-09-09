import { ClusterCardsListSkeleton } from './_components/ClusterCardsListSkeleton'
import { ClusterCardsList } from './_components/ClusterCardsList'
import { ClusterStats } from './_interfaces'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Would You - Status'
}

const Status = async () => {
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

  //  // Formula to calculate the shardid from the guild id
  //  // shard_id = (guild_id >> 22) % num_shards
  //  // Might need to be moved to a simple api route to be used in the frontend
  //  const shardFromGuild = (guildId: string) => (parseInt(guildId) >> 22) % clusterData.flat().length

  const clusterData2: ClusterStats[] = [
    [
      {
        id: 0,
        status: 0,
        ping: 107,
        guilds: 1028,
        members: 207508
      },
      {
        id: 1,
        status: 5,
        ping: 0,
        guilds: 993,
        members: 73720
      },
      {
        id: 2,
        status: 2,
        ping: 105,
        guilds: 981,
        members: 55407
      },
      {
        id: 3,
        status: 0,
        ping: 107,
        guilds: 989,
        members: 91605
      },
      {
        id: 4,
        status: 0,
        ping: 104,
        guilds: 996,
        members: 204048
      },
      {
        id: 5,
        status: 0,
        ping: 107,
        guilds: 994,
        members: 109688
      },
      {
        id: 6,
        status: 0,
        ping: 104,
        guilds: 1004,
        members: 118047
      },
      {
        id: 7,
        status: 0,
        ping: 106,
        guilds: 981,
        members: 75156
      },
      {
        id: 8,
        status: 0,
        ping: 106,
        guilds: 965,
        members: 136613
      },
      {
        id: 9,
        status: 0,
        ping: 106,
        guilds: 1021,
        members: 177371
      }
    ],
    [
      {
        id: 10,
        status: 0,
        ping: 105,
        guilds: 1000,
        members: 109128
      },
      {
        id: 11,
        status: 0,
        ping: 105,
        guilds: 974,
        members: 65602
      },
      {
        id: 12,
        status: 0,
        ping: 105,
        guilds: 1044,
        members: 5252317
      },
      {
        id: 13,
        status: 0,
        ping: 105,
        guilds: 986,
        members: 135794
      },
      {
        id: 14,
        status: 0,
        ping: 104,
        guilds: 1015,
        members: 351130
      },
      {
        id: 15,
        status: 0,
        ping: 111,
        guilds: 978,
        members: 657113
      },
      {
        id: 16,
        status: 0,
        ping: 104,
        guilds: 959,
        members: 102137
      },
      {
        id: 17,
        status: 0,
        ping: 104,
        guilds: 1040,
        members: 108287
      },
      {
        id: 18,
        status: 0,
        ping: 105,
        guilds: 981,
        members: 73459
      },
      {
        id: 19,
        status: 0,
        ping: 110,
        guilds: 964,
        members: 382232
      }
    ],
    [
      {
        id: 20,
        status: 0,
        ping: 105,
        guilds: 927,
        members: 140246
      },
      {
        id: 21,
        status: 0,
        ping: 106,
        guilds: 1000,
        members: 144121
      },
      {
        id: 22,
        status: 0,
        ping: 105,
        guilds: 1027,
        members: 60886
      },
      {
        id: 23,
        status: 0,
        ping: 105,
        guilds: 934,
        members: 149494
      }
    ]
  ]

  const areSystemsDegraded = clusterData2.some((cluster) =>
    cluster.some((shard) => shard.status !== 0)
  )

  return (
    <>
      <main className="w-full mx-auto max-w-8xl px-8">
        <h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
          Status
        </h1>
        {areSystemsDegraded && (
          <span className="flex mt-8 py-4 px-6 rounded-2xl bg-status-yellow/25 border border-status-yellow/25 w-fit">
            Some systems are degraded
          </span>
        )}
        <div className="mt-8 flex flex-col gap-4">
          {clusterData2.length > 0 ?
            <ClusterCardsList data={clusterData2} />
          : <ClusterCardsListSkeleton />}
        </div>
      </main>
    </>
  )
}

export default Status
