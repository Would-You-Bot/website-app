'use client'
import { useSearchParams } from 'next/navigation'
import { questionPacks } from '@/lib/constants'
import QuestionPack from './QuestionPack'
import Filter from './Filter'

function PageContent() {
  const searchParams = useSearchParams()
  const t = searchParams.get('t')
  const packsToShow =
    t ? questionPacks.filter((pack) => pack.slug === t) : questionPacks
  // or we could do it server side in page.tsx

  return (
    <div className="space-y-10 lg:space-y-14 mb-10">
      <Filter />
      <section>
        <ul className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-8 lg:gap-10">
          {packsToShow.map((question) => (
            <li key={`pack-${question.id}`}>
              <QuestionPack pack={{ ...question }} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PageContent
