import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import { SidebarContextValue } from './types'



const SidebarContext = createContext<
  SidebarContextValue | undefined
>(undefined)

export const SidebarProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen((current) => !current)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const value = useMemo(
    () => ({
      isOpen,
      toggleSidebar,
      closeSidebar,
    }),
    [isOpen],
  )

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error(
      'useSidebar must be used within a SidebarProvider',
    )
  }

  return context
}