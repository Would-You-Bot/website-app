import { Metadata, ResolvingMetadata } from 'next'
import { getAuthTokenOrNull } from "@/helpers/oauth/helpers"
import ProfileContent from "./_components/ProfileContent"

type Props = {
  params: { id: string }
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
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${user.displayName}'s Profile | Would You`,
    description: user.description || `Check out ${user.displayName}'s Would You profile and statistics.`,
    openGraph: {
      title: `${user.displayName}'s Would You Profile`,
      description: user.description || `Check out ${user.displayName}'s Would You profile and statistics.`,
      url: `https://wouldyoubot.gg/profile/${id}`,
      siteName: 'Would You',
      images: [user.avatarUrl, ...previousImages],
      locale: 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.displayName}'s Would You Profile`,
      description: user.description || `Check out ${user.displayName}'s Would You profile and statistics.`,
      images: [user.avatarUrl],
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

