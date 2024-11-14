'use client'

import { useSearchParams } from 'next/navigation'
import { questionPacks } from '@/lib/constants'
import QuestionPack, { QuestionPackProps } from './QuestionPack'
import React from 'react'

function QuestionPackList({ packList }: { packList: QuestionPackProps[] }) {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const packsToShow =
    type ? questionPacks.filter((pack) => pack.slug === type) : questionPacks

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-10 lg:gap-x-12 xl:gap-x-14 max-md:max-w-[500px] max-md:mx-auto">
      {packsToShow.map((question) => (
        <React.Fragment key={`pack-${question.id}`}>
          <QuestionPack {...question} />
        </React.Fragment>
      ))}
    </ul>
  )
}

export default QuestionPackList
