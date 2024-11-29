import { OAuthTokenJWT } from '@/helpers/oauth/types'
import { IdTokenJWT } from '@/helpers/hooks'
import { verifyJwt } from '@/helpers/jwt'
import { cookies } from 'next/headers'
import { parseJWT } from '@oslojs/jwt'

export function getIdToken(): IdTokenJWT | null {
  const tokenString = cookies().get('ID_TOKEN')?.value
  return tokenString ? (parseJWT(tokenString) as IdTokenJWT) : null
}

/**
 * @desc Parses the current auth token as a JWT string and validates it,
 * including the signature, expiration, and not-before date.
 * Throws if the JWT is invalid or expired.
 */
export function getAuthToken(): Promise<OAuthTokenJWT> {
  const token = cookies().get('OAUTH_TOKEN')?.value

  if (!token) {
    throw new MissingTokenException()
  }

  return verifyJwt(token) as Promise<OAuthTokenJWT>
}

let cachedAuthToken: OAuthTokenJWT | null | undefined

/**
 * @desc Returns the validated auth token, or null if any error is thrown (e.g. not token found, token is expired, invalid signature,...)
 */
export const getAuthTokenOrNull = async (): Promise<OAuthTokenJWT | null> => {
  if (cachedAuthToken !== undefined) {
    return cachedAuthToken
  }

  try {
    cachedAuthToken = await getAuthToken()
  } catch (e) {
    console.error('Error getting auth token:', e)
    cachedAuthToken = null
  }

  return cachedAuthToken
}

export abstract class OAuthException extends Error {}

export class MissingTokenException extends OAuthException {}
