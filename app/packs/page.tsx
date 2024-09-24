import Container from '@/components/Container'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Question Packs',
  description: 'Explore a huge list of customized questions!'
}

function Packs() {
  return (
    <Container className="pt-8 lg:pt-10 space-y-8">
      <h1 className="space-x-2 text-xl lg:text-2xl font-bold xl:text-4xl">
        <span className="text-brand-red-100">Question</span>
        <span className="text-brand-blue-100">Packs</span>
      </h1>
    </Container>
  )
}

export default Packs
