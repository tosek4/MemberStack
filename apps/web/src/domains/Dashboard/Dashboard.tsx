import { DashboardHeader } from './components/DashboardHeader'
import { Statistics } from './components/Statistics'
import { MemberActivity } from './components/MemberActivity'
import { Attendance } from './components/Attendance'

import { styles } from './Dashboard.styled'

import { ExpiringMembers } from './components/ExpiringMembers/ExpiringMembers'
import { RecentPayments } from './components/RecentPayments'
import {
  useDashboardAttendance,
  useDashboardExpiringMembers,
  useDashboardMemberActivity,
  useDashboardOverview,
  useDashboardRecentPayments,
} from './services'
import { getDashboardStatistics } from './utils'
import { useState } from 'react'

export const Dashboard = () => {
  const [period, setPeriod] = useState('7d')
  const currentDate = new Date()
  console.log('currentDate', currentDate)
  const { data: overview } = useDashboardOverview()
  const { data: memberActivity = [] } = useDashboardMemberActivity(period)
  const { data: attendance = [] } = useDashboardAttendance('2026-09')
  const { data: expiringMembers = [] } = useDashboardExpiringMembers()
  const { data: recentPayments = [] } = useDashboardRecentPayments()

  const statistics = overview ? getDashboardStatistics(overview) : []

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.content}>
          <DashboardHeader />

          <Statistics statistics={statistics} />

          <div className={styles.analytics}>
            <MemberActivity
              data={memberActivity}
              period={period}
              onPeriodChange={(period) => setPeriod(period)}
            />

            <Attendance data={attendance} />
          </div>

          <div className={styles.bottom}>
            <ExpiringMembers members={expiringMembers} />

            <RecentPayments payments={recentPayments} />
          </div>
        </div>
      </div>
    </main>
  )
}
