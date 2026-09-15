import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { AuthUser, LoginRequest } from '@domain/Auth/types'

import { authStorage, login as loginRequest } from '@domain/Auth/services'

import { AuthContextValue } from './types'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = authStorage.getUser()
    const storedAccessToken = authStorage.getAccessToken()
    const storedRefreshToken = authStorage.getRefreshToken()

    if (storedUser && storedAccessToken && storedRefreshToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(storedUser)
      setAccessToken(storedAccessToken)
      setRefreshToken(storedRefreshToken)
    }

    setIsLoading(false)
  }, [])

  const login = useCallback(async (data: LoginRequest) => {
    const response = await loginRequest(data)

    authStorage.setUser(response.user)
    authStorage.setAccessToken(response.accessToken)
    authStorage.setRefreshToken(response.refreshToken)

    setUser(response.user)
    setAccessToken(response.accessToken)
    setRefreshToken(response.refreshToken)

    return response
  }, [])

  const logout = useCallback(() => {
    authStorage.clear()

    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
    }),
    [user, accessToken, refreshToken, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
