import type { Metadata, ResolvingMetadata, Viewport } from 'next'
import { getAuthTokenOrNull } from "@/helpers/oauth/helpers"
import ProfileContent from "./_components/ProfileContent"

type Props = {
  params: { id: string }
}

export const viewport: Viewport = {
  themeColor: '#0598F6',
  maximumScale: 5,
}

const getUserData = async (id: string) => {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 }
    }
  )
  const userData = await user.json()
  return userData
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  const userData = await getUserData(id)

  if (!userData || !userData.data) {
    return {
      title: 'User Not Found',
    }
  }

  const user = userData.data

  return {
    title: `${user.displayName}'s Profile | Would You`,
    description: user.description || `Check out ${user.displayName}'s Would You profile and statistics.`,
    openGraph: {
      title: `${user.displayName}'s Would You Profile`,
      description: user.description || `Check out ${user.displayName}'s Would You profile and statistics.`,
      url: `https://wouldyoubot.gg/profile/${id}`,
      siteName: 'Would You',
      locale: 'en_US',
      images: `https://staging.wouldyoubot.gg/api/user/${id}/og/`,
    },
    twitter: {
      title: `${user.displayName}'s Would You Profile`,
      description: user.description || `Check out ${user.displayName}'s Would You profile and statistics.`,
      images: `https://staging.wouldyoubot.gg/api/user/${id}/og/`,
    },
  }
}

export default async function ProfilePage({ params: { id } }: Props) {
  const auth = await getAuthTokenOrNull()
  const userId = auth?.payload?.id

  const canEdit = userId === id

  const userData = await getUserData(id)

  if (!userData || !userData.data) {
    return <div>User not found</div>
  }

  return <ProfileContent userData={userData.data} canEdit={canEdit} />
}
