import { ClusterStats } from '@/app/status/_interfaces'
import { cn } from '@/lib/utils'

export const StatusBadge = async () => {
  const cluster = await fetch(process.env.API_URL!, {
    method: 'GET',
    headers: {
      Authorization: process.env.API_KEY!
    },
    cache: 'no-cache'
  })

  const clusterData: ClusterStats[] = await cluster.json()

  const allSystemsOnline = clusterData.every((cluster) => {
    return cluster.every((shard) => shard.status === 0)
  })

  const allSystemsDown = clusterData.every((cluster) => {
    return cluster.every((shard) => shard.status === 5)
  })

  const areSystemsDegraded = clusterData.some((cluster) =>
    cluster.some((shard) => shard.status !== 0)
  )

  return (
    <div className="py-2 flex gap-2">
      <span
        className={cn(
          'size-2',
          areSystemsDegraded && 'bg-status-yellow',
          allSystemsOnline && 'bg-status-green',
          allSystemsDown && 'bg-status-red'
        )}
      ></span>
      <span className="text-base">
        {allSystemsOnline ?
          'All systems are online'
        : allSystemsDown ?
          'All systems are down'
        : 'Some systems are degraded'}
      </span>
    </div>
  )
}
