'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { ClusterStats, Status } from '../_interfaces'
import { cn } from '@/lib/utils'

interface ClusterCardProps {
  data: ClusterStats[]
}

export const ClusterCardsList = ({ data }: ClusterCardProps) => {
  const isAnyShardDown = data.map((cluster) =>
    cluster.some((shard) => shard.status !== Status.Ready)
  )

  const areAllShardsDown = data.map((cluster) =>
    cluster.every((shard) => shard.status === Status.Disconnected)
  )

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      <TooltipProvider delayDuration={0}>
        {data.map((cluster, index) => {
          return (
            <div
              key={index}
              className="basis-[calc(33.333%-1.5rem)] min-w-[280px] sm:min-w-[420px] space-y-4 bg-foreground/10 dark:bg-black/25 rounded-2xl p-4 sm:p-6"
            >
              <div className="flex gap-3 items-center text-xl font-bold text-foregorund">
                <span>Cluster {index}</span>
                <span
                  className={cn(
                    'w-2.5 h-2.5 rounded-full',
                    isAnyShardDown[index] ? 'bg-status-yellow'
                    : areAllShardsDown[index] ? 'bg-status-red'
                    : 'bg-status-green'
                  )}
                ></span>
              </div>
              <div
                className={cn(
                  'flex flex-wrap gap-3 sm:gap-4',
                  cluster.length > 5 && 'sm:justify-between'
                )}
              >
                {cluster.map((shard, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <div
                        className={cn(
                          'w-10 h-10 sm:w-16 sm:h-16 bg-foreground/5 rounded-2xl flex items-center justify-center',
                          shard.status === Status.Ready ?
                            'text-status-green sm:hover:bg-status-green/25 sm:hover:text-foreground'
                          : shard.status === Status.Disconnected ?
                            'text-status-red sm:hover:bg-status-red/25 sm:hover:text-foreground'
                          : 'text-status-yellow sm:hover:bg-status-yellow/25 sm:hover:text-foreground'
                        )}
                      >
                        {index}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="border-0 rounded-xl px-4 py-2 hidden sm:flex">
                      <div className="flex gap-3 text-sm sm:text-base">
                        <div className="flex flex-col items-start gap-1 text-foreground/50">
                          <span>Shard</span>
                          <span>Status</span>
                          <span>Ping</span>
                        </div>
                        <div className="flex flex-col items-start gap-1 text-foreground">
                          <span>{shard.id}</span>
                          <span>{Status[shard.status]}</span>
                          <span>{shard.ping}ms</span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )
        })}
      </TooltipProvider>
    </div>
  )
}
