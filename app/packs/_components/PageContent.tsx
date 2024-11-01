'use client'
import { useSearchParams } from 'next/navigation'
import { questionPacks } from '@/lib/constants'
import QuestionPack from './QuestionPack'
import Filter from './Filter'
import React from 'react'

function PageContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const page = parseInt(searchParams.get('page') || '1')

  const getQuestionPacks = async () => {
    const res = await fetch(`/api/packs?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  }

  const questionPack2s = getQuestionPacks()

  console.log(questionPack2s)

  const packsToShow =
    type ? questionPacks.filter((pack) => pack.slug === type) : questionPacks
  

  return (
    <div className="space-y-10 lg:space-y-14 mb-10">
      <Filter />
      <section>
        <ul className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-10 lg:gap-x-12 xl:gap-x-16">
          {packsToShow.map((question) => (
            <React.Fragment key={`pack-${question.id}`}>
              <QuestionPack pack={{ ...question }} />
            </React.Fragment>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PageContent
