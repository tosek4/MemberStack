import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { User, UserFilters as UserFiltersState, UserRole } from './types'
import { UserCard } from './components'
import { LABELS } from './utils/labels'
import { styles } from './Users.styled'
import { UserFilters } from './components/UserFilters/UserFilters'
import { useRoles, useUsers } from './services'
import { useDebounce } from '@/hooks/useDebounce'

export const Users: React.FC = () => {
  const router = useRouter()

  const [filters, setFilters] = useState<UserFiltersState>({
    search: '',
    role: 'all',
    status: 'all',
  })

  const debouncedSearch = useDebounce(filters.search, 400)

  const {
    data: users = [],
    isPending,
    isFetching,
    isError,
  } = useUsers({
    search: debouncedSearch,
    role: filters.role,
    status: filters.status,
  })

  const { data: roles = [] } = useRoles()

  const stats = {
    total: users.length,
    active: users.filter((user) => user.isActive).length,
    administrators: users.filter(
      (user) => user.role?.name === 'admin' || user.role?.name === 'super_admin',
    ).length,
    receptionists: users.filter((user) => user.role?.name === 'receptionist').length,
  }

  const handleToggleStatus = (user: { id: number; status: boolean }) => {
    // setUsers((currentUsers) =>
    //   currentUsers.map((currentUser) =>
    //     currentUser.id === user.id
    //       ? {
    //           ...currentUser,
    //           status: currentUser.status === 'active' ? 'inactive' : 'active',
    //         }
    //       : currentUser,
    //   ),
    // )
  }

  const handleEdit = (user: User) => {
    console.log('Edit staff member:', user)
  }

  const rolesFilters = [
    {
      value: 'all',
      label: LABELS.allRoles,
    },
    ...roles.map((role) => ({
      value: role.id,
      label: LABELS.roles[role.name as UserRole],
    })),
  ]

  return (
    <main className={styles.root}>
      <div className={styles.header.wrapper}>
        <div>
          <h1 className={styles.header.title}>{LABELS.title}</h1>

          <p className={styles.header.subtitle}>
            Manage the people who work in your gym.
          </p>
        </div>

        <button
          type="button"
          className={styles.header.button}
          onClick={() => router.push('/users/new')}
        >
          + {LABELS.addUser}
        </button>
      </div>

      <div className={styles.stats.grid}>
        <div className={styles.stats.card}>
          <p className={styles.stats.label}>{LABELS.stats.total}</p>
          <p className={styles.stats.value}>{stats.total}</p>
        </div>

        <div className={styles.stats.card}>
          <p className={styles.stats.label}>{LABELS.stats.active}</p>
          <p className={styles.stats.value}>{stats.active}</p>
        </div>

        <div className={styles.stats.card}>
          <p className={styles.stats.label}>{LABELS.stats.administrators}</p>
          <p className={styles.stats.value}>{stats.administrators}</p>
        </div>

        <div className={styles.stats.card}>
          <p className={styles.stats.label}>{LABELS.stats.receptionists}</p>
          <p className={styles.stats.value}>{stats.receptionists}</p>
        </div>
      </div>

      <UserFilters
        filters={filters}
        onChange={setFilters}
        roles={rolesFilters}
      />
      {isFetching && !isPending && (
        <p className={styles.emptyDescription}>Searching...</p>
      )}
      {isPending ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Loading payments...</p>
        </div>
      ) : isError ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Failed to load payments</p>

          <p className={styles.emptyDescription}>Please try again later.</p>
        </div>
      ) : users.length > 0 ? (
        <div className={styles.grid}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>{LABELS.noUsers}</div>
      )}
    </main>
  )
}
