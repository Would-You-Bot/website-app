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

export interface QuestionPackProps {
  type: string
  id: string
  featured: boolean
  name: string
  language: string
  description: string
  tags: string[]
  likes: number
  questions: number
}

export default function QuestionPack({
  type,
  id,
  featured,
  name,
  language,
  description,
  tags,
  likes,
  questions
}: QuestionPackProps) {
  const likePack = (packToLike: string) => {
    console.log(`Liked pack ${packToLike}`)
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
              <p className="">{questions}</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm text-muted-foreground">Type</h3>
              <p className="">{type.toUpperCase()}</p>
            </div>
          </CardContent>
        </div>
        <CardFooter className="grid grid-cols-2 gap-4 lg:gap-10">
          <Button
            onClick={() => likePack(id)}
            variant="secondary"
            className="w-full dark:bg-[hsl(0,0%,6%)]"
          >
            <Heart className="mr-2 h-4 w-4 text-brand-customGrayText fill-brand-customGrayText shrink-0" />
            <span className="text-muted-foreground">
              {likes === 1 ? `${likes} Like` : `${likes} Likes`}
            </span>
          </Button>
          <QuestionPackDetails id={id} type={type} />
        </CardFooter>
      </Card>
    </li>
  )
}
