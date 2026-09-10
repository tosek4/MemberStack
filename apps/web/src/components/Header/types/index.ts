export interface HeaderUser {
  name: string
  email?: string
  role?: string
}

export interface HeaderProps {
  user: HeaderUser
  isDarkMode: boolean
  onMenuClick?: () => void
  onThemeToggle?: () => void
  onProfileClick?: () => void
  onLogout?: () => void
}
