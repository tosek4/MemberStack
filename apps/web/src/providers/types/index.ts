import { AuthUser, LoginRequest, LoginResponse } from '@/domains/Auth/types'

export interface AuthContextValue {
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginRequest) => Promise<LoginResponse>
  logout: () => void
}

export interface ThemeContextValue {
  isDarkMode: boolean
  toggleTheme: () => void
}

export interface SidebarContextValue {
  isOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}

export interface QueryProviderProps {
  children: React.ReactNode
}
