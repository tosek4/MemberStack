'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth, useSidebar } from '@providers'

import { styles } from './Sidebar.styled'
import { sidebarItems } from './utils'

export const Sidebar: React.FC = () => {
  const router = useRouter()

  const { isOpen } = useSidebar()
  const { user } = useAuth()

  const userRole = user?.role?.name

  const visibleSidebarItems = sidebarItems.filter((item) => {
    if (!item.roles) {
      return true
    }

    return userRole ? item.roles.includes(userRole) : false
  })

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return router.pathname === '/dashboard'
    }

    return router.pathname.startsWith(href)
  }

  return (
    <aside
      className={`${styles.root.base} ${
        isOpen ? styles.root.open : styles.root.closed
      }`}
    >
      <div className={styles.brand.wrapper}>
        <span className={styles.brand.name}>MemberStack</span>
      </div>

      <nav className={styles.navigation.wrapper}>
        <div className={styles.navigation.section.wrapper}>
          {visibleSidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navigation.item.base} ${
                isActive(item.href)
                  ? styles.navigation.item.active
                  : styles.navigation.item.inactive
              }`}
            >
              <span className={styles.navigation.item.icon}>{item.icon}</span>

              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  )
}
