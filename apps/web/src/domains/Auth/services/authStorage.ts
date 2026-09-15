import { AuthUser } from '../types'

const ACCESS_TOKEN_KEY = 'memberstack_access_token'
const REFRESH_TOKEN_KEY = 'memberstack_refresh_token'
const USER_KEY = 'memberstack_user'

export const authStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') {
      return null
    }

    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') {
      return null
    }

    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  },

  getUser: (): AuthUser | null => {
    if (typeof window === 'undefined') {
      return null
    }

    const value = localStorage.getItem(USER_KEY)

    if (!value) {
      return null
    }

    try {
      return JSON.parse(value) as AuthUser
    } catch {
      return null
    }
  },

  setUser: (user: AuthUser): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  clear: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
