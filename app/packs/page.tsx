import Container from '@/components/Container'

import PageContent from './_components/PageContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Question Packs',
  description: 'Explore a huge list of customized questions!'
}

export const dynamic = 'force-dynamic'

const getPacks = async () => {
  try {
    const response = await fetch('/')
  } catch (error) {
    console.error(error)
  }
}

async function page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const type = searchParams.t

  return (
    <Container className="pt-8 lg:pt-10 space-y-8 min-h-[calc(100vh-112px)]">
      <h1 className="space-x-2 text-xl lg:text-3xl font-bold xl:text-5xl">
        <span className="text-brand-red-100 drop-shadow-red-glow">
          Question
        </span>
        <span className="text-brand-blue-100 drop-shadow-blue-glow">Packs</span>
      </h1>
      <PageContent />
    </Container>
  )
}

export default page
