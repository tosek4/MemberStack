'use client'

import React, { useState } from 'react'
import { ChevronDown, LogOut, Menu, Moon, Settings, Sun } from 'lucide-react'

import { useAuth, useTheme } from '@providers'

import { styles } from './Header.styled'
import { LABELS } from './utils/labels'

export const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const initials = user?.name
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className={styles.root}>
      <div className={styles.left.wrapper}>
        <button
          type="button"
          aria-label={LABELS.openMenu}
          className={styles.menuButton}
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
          <div className={styles.right.user.wrapper}>
            <button
              type="button"
              className={styles.right.user.button}
              onClick={() => setIsDropdownOpen((open) => !open)}
            >
              <div className={styles.right.user.avatar}>{initials}</div>

              <div className={styles.right.user.info}>
                <p className={styles.right.user.name}>{user.name}</p>

                <p className={styles.right.user.role}>{user.role}</p>
              </div>

              <ChevronDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className={styles.right.dropdown.root}>
                <button type="button" className={styles.right.dropdown.item}>
                  <Settings size={16} />
                  {LABELS.profile}
                </button>

                <div className={styles.right.dropdown.divider} />

                <button
                  type="button"
                  className={styles.right.dropdown.logout}
                  onClick={logout}
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
