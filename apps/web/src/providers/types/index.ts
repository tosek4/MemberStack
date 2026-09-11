export interface AuthUser {
  name: string
  email: string
  role: string
}

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (user: AuthUser) => void
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
