import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { UserRole } from '@/app/(protected)/users/model'

export type User = {
    sub: number
  role: UserRole
  }

export async function getAccessToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value
  return token ?? null
}



export async function getUserFromCookie(): Promise<User | null> {
  const token = await getAccessToken()
  if (!token) return null

  try {
    return jwtDecode<User>(token)
  } catch {
    return null
  }
}