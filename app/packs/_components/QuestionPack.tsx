'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { QuestionPackDetails } from './QuestionPackDetails'
import { Button } from '@/components/ui/button'
import { Flame, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export interface QuestionPackProps {
  type: string
  id: string
  featured: boolean
  name: string
  language: string
  description: string
  tags: string[]
  likes: string[]
  questions: number
}

export default function QuestionPack({
  userId,
  type,
  id,
  featured,
  name,
  language,
  description,
  tags,
  likes: initialLikes,
  questions
}: { userId: string | null } & QuestionPackProps) {
  const [likes, setLikes] = useState<string[]>(initialLikes)
  async function likePack(packId: string) {
    if (!userId) return

    try {
      const response = await fetch(`/api/packs/${packId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const updatedLikes = await response.json()

      setLikes(updatedLikes.likes)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <li
      className={cn('p-[3px]', {
        'popular-pack': featured
      })}
    >
      <Card className="border-none h-full flex flex-col justify-between">
        <div>
          <CardHeader className="relative">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
            {featured && (
              <div className="flex uppercase tracking-wider items-center w-fit gap-1 px-2 py-1 rounded-md text-white popular-badge select-none absolute right-6 top-5">
                <Flame className="size-4 fill-white" />
                <span className="text-[11px] hidden lg:block">Popular</span>
              </div>
            )}
          </CardHeader>

          <CardContent className="grid grid-cols-2">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm text-muted-foreground">Questions</h3>
              <p>{questions}</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm text-muted-foreground">Type</h3>
              <p>{type}</p>
            </div>
          </CardContent>
        </div>

        <CardFooter className="grid grid-cols-2 gap-4 lg:gap-10">
          <Button
            onClick={() => likePack(id)}
            variant="secondary"
            className="w-full dark:bg-[hsl(0,0%,6%)]"
          >
            <Heart
              className={cn(
                'mr-2 h-4 w-4 shrink-0',
                likes?.includes(userId || '0') ?
                  'text-red-500 fill-red-500'
                : 'text-brand-customGrayText fill-brand-customGrayText'
              )}
            />
            <span
              className={cn(
                'text-muted-foreground',
                likes?.includes(userId || '0') && 'text-red-500'
              )}
            >
              {likes?.length === 1 ?
                `${likes?.length} Like`
              : `${likes?.length} Likes`}
            </span>
          </Button>

          <QuestionPackDetails
            id={id}
            type={type}
          />
        </CardFooter>
      </Card>
    </li>
  )
}
