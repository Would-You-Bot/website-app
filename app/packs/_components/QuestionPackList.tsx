'use client'

import QuestionPack, { QuestionPackProps } from './QuestionPack'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function QuestionPackList({
  packList,
  userId
}: {
  packList: QuestionPackProps[]
  userId: string | null
}) {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-10 lg:gap-x-12 xl:gap-x-14 max-md:max-w-[500px] max-md:mx-auto">
      {packList.map((question) => (
        <React.Fragment key={`pack-${question.id}`}>
          <QuestionPack
            {...question}
            userId={userId}
          />
        </React.Fragment>
      ))}
    </ul>
  )
}

export default QuestionPackList
