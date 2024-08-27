import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { discordOAuthClient } from '@/helpers/oauth'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function GET() {
  const token = await getAuthTokenOrNull()

  if (token) {
    await Promise.allSettled([
      discordOAuthClient.revokeToken(
        token.payload.discord.access_token,
        'access_token'
      ),
      discordOAuthClient.revokeToken(
        token.payload.discord.refresh_token,
        'refresh_token'
      )
    ])
  }

  cookies().delete('OAUTH_TOKEN')
  cookies().delete('ID_TOKEN')

  return redirect('/')
}
