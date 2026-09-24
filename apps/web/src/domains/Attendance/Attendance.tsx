import React, { useState } from 'react'
import { Users, LogIn } from 'lucide-react'

import { AttendanceCard, AttendanceFilters, CheckIn } from './components'

import type { AttendanceStatusFilter, CheckInFormData } from './types'

import { styles } from './Attendance.styled'
import {
  useAttendances,
  useAttendanceStats,
  useCreateAttendance,
  useCreateDailyVisit,
  useUpdateAttendance,
} from './services'
import { getLocalDateString } from '@/utils/date'
import { useDebounce } from '@/hooks/useDebounce'
import { DailyCheckIn } from './components/DailyCheckIn'
import { DailyCheckInFormData } from './components/DailyCheckIn/types'

export const Attendance: React.FC = () => {
  const today = getLocalDateString()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<AttendanceStatusFilter>('all')
  const [date, setDate] = useState(today)
  const [dailyCheckInModalOpen, setDailyCheckInModalOpen] = useState(false)
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
  const createDailyVisit = useCreateDailyVisit()

  const handleCheckIn = async (data: CheckInFormData) => {
    const formattedData = {
      memberId: data.memberId,
      checkedInAt: new Date().toISOString(),
      attendanceMethod: 'manual' as const,
      status: 'checked-in' as const,
    }

    createAttendance.mutate(formattedData, {
      onSuccess: () => {
        setCheckInModalOpen(false)
      },
    })
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

  const handleDailyCheckIn = async (data: DailyCheckInFormData) => {
    const formattedData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.trim(),
      membershipPlanId: data.membershipPlanId,
      paymentMethod: data.paymentMethod,
    }

    createDailyVisit.mutate(
      { data: formattedData },
      {
        onSuccess: () => {
          setDailyCheckInModalOpen(false)
        },
      },
    )
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
              Track member check-ins and daily visits.
            </p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.checkInButton}
              onClick={() => setCheckInModalOpen(true)}
            >
              <LogIn size={18} />
              Check In Member
            </button>

            <button
              type="button"
              className={styles.checkInButton}
              onClick={() => setDailyCheckInModalOpen(true)}
            >
              <LogIn size={18} />
              Daily Check In
            </button>
          </div>
        </header>

        <section className={styles.stats}>
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

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Users size={20} />
            </div>

            <div>
              <p className={styles.statLabel}>Total Visits</p>

              <p className={styles.statValue}>
                {attendanceStats?.totalVisits || 0}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.history}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Attendance History</h2>
          </div>

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
      <DailyCheckIn
        open={dailyCheckInModalOpen}
        loading={createDailyVisit.isPending}
        onClose={() => setDailyCheckInModalOpen(false)}
        onSubmit={handleDailyCheckIn}
      />
    </main>
  )
}
