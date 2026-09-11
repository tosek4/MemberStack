export interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
}

export interface SidebarProps {
  items?: SidebarItem[]
}
