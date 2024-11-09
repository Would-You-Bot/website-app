import Container from '@/components/Container'

import PageContent from './_components/PageContent'
import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://wouldyoubot.gg'),
  alternates: {
    canonical: '/'
  },
  title: 'Question Packs - Would You',
  description:
    'Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!',
  twitter: {
    title: 'Question Packs - Would You',
    card: 'summary_large_image',
    images: '/question-packs.png',
    description:
      'Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!'
  },
  openGraph: {
    title: 'Question Packs - Would You',
    images: '/question-packs.png',
    description:
      'Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!'
  },
  robots: {
    index: true,
    follow: true
  }
}

export const viewport: Viewport = {
  maximumScale: 5,
  themeColor: '#0598F6'
}

export const dynamic = 'force-dynamic'

export interface PackResponse {
  data: {
    id: string
    name: string
    description: string
    tags: string[]
    likes: string[]
    questions: string[]
    featured: boolean
  }
  pages: number
}

const getQuestionPacks = async (page: string, type: string) => {
  const res = await fetch(`https://localhost:3000/api/packs?page=${page}&type=${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const resData: PackResponse = await res.json()
  return resData
}

async function page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const type = searchParams.type ? searchParams.type as string : 'all'
  const page = searchParams.page ? searchParams.page as string : '1';

  // const data = await getQuestionPacks(page, type)

  return (
    <Container className="pt-8 lg:pt-10 space-y-8 min-h-[calc(100vh-112px)]">
      <h1 className="text-4xl font-bold">
        <span className="text-brand-red-100 drop-shadow-red-glow">
          Question
        </span>{' '}
        <span className="text-brand-blue-100 drop-shadow-blue-glow">Packs</span>
      </h1>
      {/* pass data down */}
      <PageContent />
    </Container>
  )
}

export default page
