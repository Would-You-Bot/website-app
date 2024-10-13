import Container from '@/components/Container'

import PageContent from './_components/PageContent'
import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL("https://wouldyoubot.gg"),
  alternates: {
    canonical: "/",
  },
  title: 'Question Packs - Would You',
  description: 'Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!',
  twitter: {
    title: "Question Packs - Would You",
    card: "summary_large_image",
    description:
      "Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!",
  },
  openGraph: {
    title: "Question Packs - Would You",
    description:
      "Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
	maximumScale: 5,
	themeColor: "#0598F6",
};

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
        <h1 className="text-4xl font-bold">
          <span className="text-brand-red-100 drop-shadow-red-glow">Question</span>{" "}
        <span className="text-brand-blue-100 drop-shadow-blue-glow">Packs</span>
      </h1>
      <PageContent />
    </Container>
  )
}

export default page
