import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { User, UserFilters as UserFiltersState } from './types'
import { UserCard } from './components'
import { LABELS } from './utils/labels'
import { styles } from './Users.styled'
import { UserFilters } from './components/UserFilters/UserFilters'
import { useUsers } from './services'

export const Users: React.FC = () => {
  const router = useRouter()

  const { data: users = [] } = useUsers()
  const [filters, setFilters] = useState<UserFiltersState>({
    search: '',
    role: 'all',
    status: 'all',
  })

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = filters.search.toLowerCase()

      const matchesSearch =
        !search ||
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)

      const matchesRole = filters.role === 'all' || user.role === filters.role

      const matchesStatus =
        filters.status === 'all' ||
        user.isActive === (filters.status === 'active')

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, filters])

  const stats = {
    total: users.length,
    active: users.filter((user) => user.isActive).length,
    administrators: users.filter(
      (user) => user.role === 'admin' || user.role === 'super_admin',
    ).length,
    receptionists: users.filter((user) => user.role === 'receptionist').length,
  }

  const handleToggleStatus = (user: { id: number; status: boolean }) => {
    console.log('user', user)
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

      <UserFilters filters={filters} onChange={setFilters} />

      <div className={styles.grid}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
            />
          ))
        ) : (
          <div className={styles.empty}>{LABELS.noUsers}</div>
        )}
      </div>
    </main>
  )
}
