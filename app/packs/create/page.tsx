import Container from '@/components/Container'
import PackForm from './_components/PackForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create pack',
  description: 'Create question packs for your server'
}

function Create() {
  return (
    <Container className="pt-8 lg:pt-10 space-y-8">
      <h1 className="space-x-2 text-xl lg:text-2xl font-bold xl:text-4xl">
        <span className="text-brand-red-100 drop-shadow-red-glow">Create</span>
        <span className="text-brand-blue-100 drop-shadow-blue-glow">Pack</span>
      </h1>
      <PackForm />
    </Container>
  )
}

export default Create
