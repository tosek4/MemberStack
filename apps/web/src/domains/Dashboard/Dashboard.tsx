import { Attendance, MemberActivity } from '../Charts'
import { Statistics } from '../Statistics'

const statistics = [
  {
    title: 'All Members',
    value: 842,
    trend: '+12',
    description: 'this month',
    trendPositive: true,
  },
  {
    title: 'Active Members',
    value: 721,
    trend: '85.6%',
    description: 'of members',
    trendPositive: true,
  },
  {
    title: 'Expiring Soon',
    value: 24,
    description: 'Needs attention',
    trendPositive: false,
  },
  {
    title: "Today's Attendance",
    value: 86,
    trend: '+15%',
    description: 'compared to yesterday',
    trendPositive: true,
  },
]

const memberActivity = [
  {
    date: 'Mon',
    newMembers: 12,
    activeMembers: 720,
    expiredMembers: 8,
  },
  {
    date: 'Tue',
    newMembers: 18,
    activeMembers: 728,
    expiredMembers: 5,
  },
  {
    date: 'Wed',
    newMembers: 10,
    activeMembers: 730,
    expiredMembers: 7,
  },
  {
    date: 'Thu',
    newMembers: 24,
    activeMembers: 742,
    expiredMembers: 4,
  },
  {
    date: 'Fri',
    newMembers: 20,
    activeMembers: 750,
    expiredMembers: 9,
  },
]

const attendance = [
  { date: '2026-09-01', checkIns: 45 },
  { date: '2026-09-02', checkIns: 62 },
  { date: '2026-09-03', checkIns: 78 },
  { date: '2026-09-04', checkIns: 51 },
  { date: '2026-09-05', checkIns: 24 },
  { date: '2026-09-06', checkIns: 12 },

  { date: '2026-09-07', checkIns: 67 },
  { date: '2026-09-08', checkIns: 72 },
  { date: '2026-09-09', checkIns: 81 },
  { date: '2026-09-10', checkIns: 55 },
]

export const Dashboard = () => {
  return (
    <main className="space-y-6 m-5">
      <Statistics statistics={statistics} />

      <div className="grid gap-6 xl:grid-cols-2">
        <MemberActivity data={memberActivity} />

        <Attendance month="September 2026" days={attendance} />
      </div>
    </main>
  )
}
