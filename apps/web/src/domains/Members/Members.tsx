import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { MemberCard } from './components/MemberCard'
import { MemberFilters } from './components/MemberFilters'
import { MemberStatusFilter } from './types'

import { useMembers } from './services'

import { styles } from './Members.styled'

export const Members: React.FC = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<MemberStatusFilter>('all')

  const router = useRouter()

  const { data: members = [], isLoading, isError } = useMembers()

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    return members.filter((member) => {
      const matchesSearch =
        !normalizedSearch ||
        member.firstName.toLowerCase().includes(normalizedSearch) ||
        member.lastName.toLowerCase().includes(normalizedSearch) ||
        member.email.toLowerCase().includes(normalizedSearch) ||
        member.phone?.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        status === 'all' || member.activeSubscription?.status === status

      return matchesSearch && matchesStatus
    })
  }, [members, search, status])

  const handleViewMember = (member: (typeof members)[number]) => {
    router.push(`/members/${member.id}`)
  }

  if (isLoading) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Loading members...</p>
          </div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Failed to load members</p>

            <p className={styles.emptyText}>Please try again later.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header.wrapper}>
          <div>
            <h1 className={styles.header.title}>Members</h1>

            <p className={styles.header.subtitle}>
              Manage your gym members and memberships.
            </p>
          </div>

          <button
            type="button"
            className={styles.header.addButton}
            onClick={() => router.push('/members/new')}
          >
            Add member
          </button>
        </div>

        <MemberFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        {filteredMembers.length > 0 ? (
          <div className={styles.grid}>
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onView={handleViewMember}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No members found</p>

            <p className={styles.emptyText}>
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
