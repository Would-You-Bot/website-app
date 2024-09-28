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
import { Flame, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export default function QuestionPack({pack}: {pack:QuestionPackProps}) {
  const likePack = (packToLike: number) => {
    console.log(`Liked pack ${packToLike}`)
  }

  return (
    <Card className={pack.featured ? 'popular-pack border-2 overflow-hidden' : ''}>
      <CardHeader className="relative">
        <CardTitle>{pack.name}</CardTitle>
        <CardDescription>{pack.description}</CardDescription>
        {pack.featured && (
          <div className="flex items-center w-fit gap-1 px-2 py-1 text-xs rounded-md text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 select-none absolute right-6 top-5">
            <Flame className="size-4 fill-white" />
            <span>Popular</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <div className="flex flex-col gap-1">
          <h3>Questions</h3>
          <p className="text-muted-foreground text-sm">{pack.questions.length}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3>Type</h3>
          <p className="text-muted-foreground capitalize text-sm">{pack.type}</p>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 lg:gap-10">
        <Button
          onClick={() => likePack(pack.id)}
          variant="secondary"
          className="w-full"
        >
          <Heart className="mr-2 h-4 w-4 text-brand-customGrayText fill-brand-customGrayText" />
          <span>{pack.likes} Likes</span>
        </Button>
        <QuestionPackDetails {...pack} />
      </CardFooter>
    </Card>
  )
}
