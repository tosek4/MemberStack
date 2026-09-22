export interface RecentPayment {
  id: number
  memberId: number
  firstName: string
  lastName: string
  planName: string
  amount: string
  date: string
}

export interface RecentPaymentsProps {
  payments: RecentPayment[]
}
