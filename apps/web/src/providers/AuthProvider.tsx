import React, { createContext, useContext, useMemo, useState } from 'react'
import { AuthContextValue, AuthUser } from './types'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>({
    name: 'Admin User',
    email: 'admin@memberstack.com',
    role: 'Administrator',
  })

  const login = (authenticatedUser: AuthUser) => {
    setUser(authenticatedUser)
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user],
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
