'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Flame, Heart, Edit, RefreshCw } from 'lucide-react'
import { QuestionPackDetails } from './QuestionPackDetails'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Link from 'next/link'

export interface QuestionPackProps {
  type: string
  id: string
  featured: boolean
  name: string
  language: string
  description: string
  tags: string[]
  likes: string
  userLiked: boolean
  questions: number
  style?: 'default' | 'created' | 'denied'
}

export default function QuestionPack({
  userId,
  type,
  id,
  featured,
  name,
  description,
  likes: initialLikes,
  userLiked: initialUserLiked,
  questions,
  style = 'default'
}: { userId: string | null } & QuestionPackProps) {
  const [likes, setLikes] = useState<number>(parseInt(initialLikes, 10))
  const [userLiked, setUserLiked] = useState<boolean>(initialUserLiked)
  const router = useRouter()

  async function likePack(packId: string) {
    if (!userId) return

    try {
      const response = await fetch(`/api/packs/${packId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        next: {
          revalidate: false
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const updatedLikes = await response.json()

      if (updatedLikes.userLiked) {
        setUserLiked(true)
        setLikes((prevLikes) => prevLikes + 1)
      } else {
        setUserLiked(false)
        setLikes((prevLikes) => prevLikes - 1)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div
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
          {style === 'default' && (
            <>
              <Button
                onClick={() => likePack(id)}
                variant="secondary"
                className="w-full dark:bg-[hsl(0,0%,6%)]"
              >
                <Heart
                  className={cn(
                    'mr-2 h-4 w-4 shrink-0',
                    userLiked ?
                      'text-red-500 fill-red-500'
                    : 'text-brand-customGrayText fill-brand-customGrayText'
                  )}
                />
                <span
                  className={cn(
                    'text-muted-foreground',
                    userLiked && 'text-red-500'
                  )}
                >
                  {likes === 1 ? `${likes} Like` : `${likes} Likes`}
                </span>
              </Button>

              <QuestionPackDetails
                id={id}
                type={type}
              />
            </>
          )}

          {style === 'created' && (
            <Button
              variant="secondary"
              asChild
            >
              <Link
                href={`/packs/edit/${id}`}
                className="w-full col-span-2 dark:bg-[hsl(0,0%,6%)]"
              >
                <Edit className="mr-2 h-4 w-4 shrink-0" />
                Edit
              </Link>
            </Button>
          )}

          {style === 'denied' && (
            <>
              <Button
                variant="secondary"
                className="w-full bg-red-500 hover:bg-red-600 text-white dark:bg-red-500 dark:hover:bg-red-600"
                onClick={() => router.push(`/packs/edit/${id}?resubmit=true`)}
              >
                <RefreshCw className="mr-2 h-4 w-4 shrink-0" />
                Resubmit
              </Button>
              <Button
                className="w-full bg-brand-blue-100 hover:bg-brand-blue-200 text-white"
                onClick={() => router.push(`/packs/edit/${id}`)}
              >
                <Edit className="mr-2 h-4 w-4 shrink-0" />
                <span>Edit</span>
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
