import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { MemberCard } from './components/MemberCard'
import { MemberFilters } from './components/MemberFilters'
import { MemberStatusFilter } from './types'

import { useMembers } from './services'

import { styles } from './Members.styled'

import { useDebounce } from '@/hooks/useDebounce'

export const Members: React.FC = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<MemberStatusFilter>('all')

  const debouncedSearch = useDebounce(search, 400)

  const router = useRouter()

  const {
    data: members = [],
    isPending,
    isFetching,
    isError,
  } = useMembers({
    search: debouncedSearch,
    status,
  })

  const handleViewMember = (member: (typeof members)[number]) => {
    router.push(`/members/${member.id}`)
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

        {isPending ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Loading members...</p>
          </div>
        ) : isError ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Failed to load members</p>

            <p className={styles.emptyText}>Please try again later.</p>
          </div>
        ) : members.length > 0 ? (
          <div className={styles.grid}>
            {members.map((member) => (
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

        {isFetching && !isPending && (
          <div className={styles.searchLoading}>Searching...</div>
        )}
      </div>
    </main>
  )
}
