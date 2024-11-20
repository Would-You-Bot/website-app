
export default async function Profile({ params: { id } }: { params: { id: string } }) {
  const getUser = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`)
    const user = await response.json()
    console.log(user)
    return user
  }
  const user = await getUser(id)
  return (
    <div className="mx-auto my-56 flex w-full max-w-8xl flex-1 flex-col items-center justify-center px-8 text-foreground">
      <h1>Hello {String(user.data.displayName)}!</h1>
    </div>
  )
}
