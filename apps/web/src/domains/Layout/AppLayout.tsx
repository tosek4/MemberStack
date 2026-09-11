import React from 'react'
import { useSidebar } from '@providers'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
}) => {
  const { isOpen } = useSidebar()

  return (
    <div
      className={`min-h-screen transition-all duration-200 ${
        isOpen ? 'ml-64' : 'ml-0'
      }`}
    >
      {children}
    </div>
  )
}