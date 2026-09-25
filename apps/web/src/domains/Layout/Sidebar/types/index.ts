export interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
  roles?: readonly string[]
}

export interface SidebarProps {
  items?: SidebarItem[]
}
