import { getAuthTokenOrNull } from "@/helpers/oauth/helpers"
import ProfileContent from "./_components/ProfileContent"

export default async function ProfilePage({ params: { id } }: { params: { id: string } }) {
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

const auth = await getAuthTokenOrNull()
const userId = auth?.payload?.id

const canEdit = userId === id

const userData = await getUserData(id)
return <ProfileContent userData={userData.data} canEdit={canEdit} />
}

