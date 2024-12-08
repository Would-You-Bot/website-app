'use client'

import { useEffect, useState } from 'react'
import QuestionPack from '@/app/packs/_components/QuestionPack'

export interface PackData {
  type: string
  id: string
  featured: boolean
  name: string
  language: string
  description: string
  tags: string[]
  likes: string
  questions: number
  pending: boolean
  denied: boolean
  userLiked: boolean
}

export interface PackResponse {
  data: PackData[]
  totalPages: number
}

interface PackListProps {
  type: 'likes' | 'created'
  id: string
}

export function PackList({ type, id }: PackListProps) {
  const [packs, setPacks] = useState<PackResponse['data']>([])

  useEffect(() => {
    async function getPack() {
      const res = await fetch(`/api/user/${id}/packs?type=${type}`)
      const packData: PackResponse = await res.json()
      setPacks(packData.data)
    }
    getPack()
  }, [type, id])

  const sortedPacks = [...packs].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  const groupedPacks = sortedPacks.reduce((acc, pack) => {
    if (type === 'created') {
      if (pack.pending) {
        acc.pending.push(pack)
      } else if (pack.denied) {
        acc.denied.push(pack)
      } else {
        acc.approved.push(pack)
      }
    } else {
      acc.all.push(pack)
    }
    return acc
  }, { all: [], approved: [], denied: [], pending: [] } as Record<string, PackResponse['data']>)

  const renderPacks = (packs: PackResponse['data'], style: 'default' | 'created' | 'denied') => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {packs.map((pack) => (
        <QuestionPack
          key={pack.id}
          userId={id}
          type={pack.type}
          id={pack.id}
          featured={pack.featured}
          name={pack.name}
          description={pack.description}
          likes={String(pack.likes)}
          userLiked={pack.userLiked}
          questions={pack.questions}
          style={style}
          language={pack.language}
          tags={pack.tags}
        />
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      {type === 'likes' && renderPacks(groupedPacks.all, 'default')}

      {type === 'created' && (
        <>
          {groupedPacks.approved.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-8 mb-4">Created Packs</h2>
              {renderPacks(groupedPacks.approved, 'default')}
            </>
          )}
          {groupedPacks.denied.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-8 mb-4">Denied Packs</h2>
              {renderPacks(groupedPacks.denied, 'denied')}
            </>
          )}
          {groupedPacks.pending.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-8 mb-4">Pending Packs</h2>
              {renderPacks(groupedPacks.pending, 'created')}
            </>
          )}
        </>
      )}
    </div>
  )
}
