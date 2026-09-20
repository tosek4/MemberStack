import React, { useState } from 'react'
import { Users, UserCheck, LogIn, LogOut } from 'lucide-react'

import { AttendanceCard, AttendanceFilters, CheckIn } from './components'

import type { AttendanceStatusFilter, CheckInFormData } from './types'

import { styles } from './Attendance.styled'
import {
  useAttendances,
  useAttendanceStats,
  useCreateAttendance,
  useUpdateAttendance,
} from './services'
import { getLocalDateString } from '@/utils/date'
import { useDebounce } from '@/hooks/useDebounce'

export const Attendance: React.FC = () => {
  const today = getLocalDateString()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<AttendanceStatusFilter>('all')
  const [date, setDate] = useState(today)
  const [checkInModalOpen, setCheckInModalOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 400)

  const {
    data: attendances = [],
    isPending,
    isFetching,
    isError,
  } = useAttendances({
    search: debouncedSearch,
    status,
    date,
  })

  const { data: attendanceStats } = useAttendanceStats(date)

  const createAttendance = useCreateAttendance()
  const updateAttendance = useUpdateAttendance()

  const handleCheckIn = async (data: CheckInFormData) => {
    const formattedData = {
      memberId: data.memberId,
      checkedInAt: new Date().toISOString(),
      attendanceMethod: 'manual' as const,
      status: 'checked-in' as const,
    }

    createAttendance.mutate(formattedData)
  }

  const handleCheckOut = (id: number) => {
    const formattedData = {
      checkedOutAt: new Date().toISOString(),
      status: 'checked-out' as const,
    }

    updateAttendance.mutate({ id: id, attendance: formattedData })
  }

  const getDateString = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const handleToday = () => {
    setDate(getDateString(new Date()))
  }

  const handleYesterday = () => {
    const yesterday = new Date()

    yesterday.setDate(yesterday.getDate() - 1)

    setDate(getLocalDateString(yesterday))
  }

  if (isPending) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Loading attendance data...</p>
            <p className={styles.emptyText}>
              Please wait while we fetch the latest information.
            </p>
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
            <p className={styles.emptyTitle}>Failed to load attendance data</p>

            <p className={styles.emptyText}>Please try again later.</p>
          </div>
        </div>
      </main>
    )
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
          <button
            type="button"
            className={styles.checkInButton}
            onClick={() => setCheckInModalOpen(true)}
          >
            <LogIn size={18} />
            Check In Member
          </button>{' '}
        </header>

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Users size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Today&apos;s Visits</p>

              <p className={styles.statValue}>
                {attendanceStats?.totalVisits || 0}
              </p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <UserCheck size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Currently In Gym</p>

              <p className={styles.statValue}>
                {attendanceStats?.currentlyInGym || 0}
              </p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <LogIn size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Check-ins</p>

              <p className={styles.statValue}>
                {attendanceStats?.checkIns || 0}
              </p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <LogOut size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Check-outs</p>

              <p className={styles.statValue}>
                {attendanceStats?.checkOuts || 0}
              </p>
            </div>
          </div>
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
            onToday={handleToday}
            onYesterday={handleYesterday}
          />

          {isFetching && !isPending && (
            <p className={styles.emptyText}>Searching...</p>
          )}

          {attendances.length > 0 ? (
            <div className={styles.grid}>
              {attendances.map((item) => (
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
      <CheckIn
        open={checkInModalOpen}
        loading={false}
        onClose={() => setCheckInModalOpen(false)}
        onSubmit={handleCheckIn}
      />
    </main>
  )
}
