'use client'
import { useSearchParams } from 'next/navigation'
import { questionPacks } from '@/lib/constants'
import QuestionPack from './QuestionPack'
import Filter from './Filter'
import React from 'react'
import PacksPagination from './PacksPagination'

function PageContent() {
  // we'll get rid of all these when data is passed from server comp and just map over that  
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
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
      <PacksPagination totalPages={120} />
    </div>
  )
}

export default PageContent
