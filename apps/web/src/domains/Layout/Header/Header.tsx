'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut, Menu, Moon, Settings, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useSidebar, useAuth, useTheme } from '@providers'

import { styles } from './Header.styled'
import { LABELS } from './utils/labels'

export const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar()
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const router = useRouter()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const initials = user?.firstName
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleClickEditProfile = () => {
    setIsDropdownOpen(false)
    router.push('/profile')
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    logout()
  }

  return (
    <header className={styles.root}>
      <div className={styles.left.wrapper}>
        <button
          type="button"
          aria-label={LABELS.openMenu}
          className={styles.menuButton}
          onClick={toggleSidebar}
        >
          <Menu size={22} />
        </button>
      </div>

      <div className={styles.right.wrapper}>
        <button
          type="button"
          aria-label={LABELS.toggleTheme}
          className={styles.right.themeButton}
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user && (
          <div ref={dropdownRef} className={styles.right.user.wrapper}>
            <button
              type="button"
              className={styles.right.user.button}
              onClick={() => setIsDropdownOpen((open) => !open)}
            >
              <div className={styles.right.user.avatar}>{initials}</div>

              <div className={styles.right.user.info}>
                <p className={styles.right.user.name}>
                  {user.firstName} {user.lastName}
                </p>

                <p className={styles.right.user.role}>{user.role?.name}</p>
              </div>

              <ChevronDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className={styles.right.dropdown.root}>
                <button
                  type="button"
                  className={styles.right.dropdown.item}
                  onClick={handleClickEditProfile}
                >
                  <Settings size={16} />
                  {LABELS.profile}
                </button>

                <div className={styles.right.dropdown.divider} />

                <button
                  type="button"
                  className={styles.right.dropdown.logout}
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  {LABELS.logout}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
