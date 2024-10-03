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
  id: number
  featured?: boolean // popular
  name: string
  description: string
  likes: number
  type: string
  questions: string[]
  slug: string
}

export default function QuestionPack({ pack }: { pack: QuestionPackProps }) {
  const likePack = (packToLike: number) => {
    console.log(`Liked pack ${packToLike}`)
  }

  return (
    <li
      className={cn('p-[3px]', {
        'popular-pack': pack.featured
      })}
    >
      <Card className="border-none h-full">
        <CardHeader className="relative">
          <CardTitle>{pack.name}</CardTitle>
          <CardDescription>{pack.description}</CardDescription>
          {pack.featured && (
            <div className="flex uppercase tracking-wider items-center w-fit gap-1 px-2 py-1 rounded-md text-white popular-badge select-none absolute right-6 top-5">
              <Flame className="size-4 fill-white" />
              <span className='text-[11px] hidden lg:block'>Popular</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-2">
          <div className="flex flex-col gap-0.5">
            <h3 className='text-sm text-muted-foreground'>Questions</h3>
            <p className="">
              {pack.questions.length}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className='text-sm text-muted-foreground'>Type</h3>
            <p className="">
              {pack.type}
            </p>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 lg:gap-10">
          <Button
            onClick={() => likePack(pack.id)}
            variant="secondary"
            className="w-full dark:bg-[hsl(0,0%,6%)]"
          >
            <Heart className="mr-2 h-4 w-4 text-brand-customGrayText fill-brand-customGrayText shrink-0" />
            <span className="text-muted-foreground">
              {pack.likes.toLocaleString()} Likes
            </span>
          </Button>
          <QuestionPackDetails {...pack} />
        </CardFooter>
      </Card>
    </li>
  )
}
