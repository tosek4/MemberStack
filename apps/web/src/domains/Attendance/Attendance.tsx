import React, { useMemo, useState } from 'react'
import { Users, UserCheck, LogIn, LogOut } from 'lucide-react'

import { AttendanceCard, AttendanceFilters, CheckIn } from './components'

import type {
  Attendance as AttendanceRecord,
  AttendanceStatusFilter,
  CheckInFormData,
} from './types'

import { styles } from './Attendance.styled'

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'attendance-1',
    memberId: 'member-1',
    memberName: 'John Smith',
    memberEmail: 'john@example.com',
    memberSubscriptionId: 'subscription-1',
    planName: 'Monthly Membership',
    checkIn: '2026-09-14T08:15:00',
    status: 'checked-in',
  },
  {
    id: 'attendance-2',
    memberId: 'member-2',
    memberName: 'Sarah Johnson',
    memberEmail: 'sarah@example.com',
    memberSubscriptionId: 'subscription-2',
    planName: 'Monthly Membership',
    checkIn: '2026-09-14T09:30:00',
    checkOut: '2026-09-14T11:05:00',
    status: 'checked-out',
  },
  {
    id: 'attendance-3',
    memberId: 'member-3',
    memberName: 'Michael Brown',
    memberEmail: 'michael@example.com',
    memberSubscriptionId: 'subscription-3',
    planName: 'Annual Membership',
    checkIn: '2026-09-14T10:10:00',
    status: 'checked-in',
  },
  {
    id: 'attendance-4',
    memberId: 'member-4',
    memberName: 'David Wilson',
    memberEmail: 'david@example.com',
    memberSubscriptionId: 'subscription-4',
    planName: 'Premium Membership',
    checkIn: '2026-09-14T07:45:00',
    checkOut: '2026-09-14T09:20:00',
    status: 'checked-out',
  },
  {
    id: 'attendance-5',
    memberId: 'member-5',
    memberName: 'Emma Davis',
    memberEmail: 'emma@example.com',
    memberSubscriptionId: 'subscription-5',
    planName: 'Monthly Membership',
    checkIn: '2026-09-14T11:20:00',
    status: 'checked-in',
  },
]

export const Attendance: React.FC = () => {
  const [attendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<AttendanceStatusFilter>('all')

  const [date, setDate] = useState('2026-09-14')

  const filteredAttendance = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    return attendance.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.memberName.toLowerCase().includes(normalizedSearch) ||
        item.memberEmail.toLowerCase().includes(normalizedSearch)

      const matchesStatus = status === 'all' || item.status === status

      const matchesDate = item.checkIn.startsWith(date)

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [attendance, search, status, date])

  const currentlyInGym = attendance.filter(
    (item) => item.checkIn.startsWith(date) && item.status === 'checked-in',
  ).length

  const totalVisits = attendance.filter((item) =>
    item.checkIn.startsWith(date),
  ).length

  const checkedOutToday = attendance.filter(
    (item) => item.checkIn.startsWith(date) && item.status === 'checked-out',
  ).length

  const handleCheckIn = async (data: CheckInFormData) => {
    console.log('Check in:', data)
  }

  const handleCheckOut = (item: AttendanceRecord) => {
    console.log('Check out:', item)
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Attendance</h1>

            <p className={styles.description}>
              Track member check-ins and check-outs.
            </p>
          </div>
        </header>

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Users size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Today&apos;s Visits</p>

              <p className={styles.statValue}>{totalVisits}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <UserCheck size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Currently In Gym</p>

              <p className={styles.statValue}>{currentlyInGym}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <LogIn size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Check-ins</p>

              <p className={styles.statValue}>{totalVisits}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <LogOut size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Check-outs</p>

              <p className={styles.statValue}>{checkedOutToday}</p>
            </div>
          </div>
        </section>

        <section className={styles.checkInSection}>
          <CheckIn onSubmit={handleCheckIn} />
        </section>

        <section className={styles.history}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Attendance History</h2>
          </div>

          <AttendanceFilters
            search={search}
            status={status}
            date={date}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onDateChange={setDate}
          />

          {filteredAttendance.length > 0 ? (
            <div className={styles.grid}>
              {filteredAttendance.map((item) => (
                <AttendanceCard
                  key={item.id}
                  attendance={item}
                  onCheckOut={handleCheckOut}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No attendance found</p>

              <p className={styles.emptyDescription}>
                Try changing your search or filters.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
