import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { MemberCard } from './components/MemberCard'
import { MemberFilters } from './components/MemberFilters'
import { Member, MemberStatusFilter } from './types'

import { styles } from './Members.styled'

const members: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+389 70 123 456',
    plan: 'Premium',
    startDate: '01 Sep 2026',
    endDate: '01 Sep 2027',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+389 71 234 567',
    plan: 'Standard',
    startDate: '15 Mar 2026',
    endDate: '20 Sep 2026',
    status: 'expiring',
  },
  {
    id: '3',
    name: 'Michael Smith',
    email: 'michael@example.com',
    plan: 'Premium',
    startDate: '01 Jan 2026',
    endDate: '01 Aug 2026',
    status: 'expired',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    plan: undefined,
    status: 'no-subscription',
  },
]

export const Members: React.FC = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<MemberStatusFilter>('all')
  const router = useRouter()

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    return members.filter((member) => {
      const matchesSearch =
        !normalizedSearch ||
        member.name.toLowerCase().includes(normalizedSearch) ||
        member.email.toLowerCase().includes(normalizedSearch) ||
        member.phone?.toLowerCase().includes(normalizedSearch)

      const matchesStatus = status === 'all' || member.status === status

      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const handleViewMember = (member: Member) => {
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
