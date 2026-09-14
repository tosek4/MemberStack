import React, { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/router'

import type { Payment, PaymentMethodFilter, PaymentStatusFilter } from './types'

import { styles } from './Payments.styled'
import { PaymentCard, PaymentFilters } from './components'

const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'payment-1',
    memberId: 'member-1',
    memberName: 'John Smith',
    memberEmail: 'john@example.com',
    memberSubscriptionId: 'subscription-1',
    planName: 'Monthly Membership',
    amount: 40,
    currency: 'EUR',
    method: 'card',
    status: 'paid',
    paymentDate: '2026-09-14',
    reference: 'POS-1024',
  },
  {
    id: 'payment-2',
    memberId: 'member-2',
    memberName: 'Sarah Johnson',
    memberEmail: 'sarah@example.com',
    memberSubscriptionId: 'subscription-3',
    planName: 'Monthly Membership',
    amount: 40,
    currency: 'EUR',
    method: 'cash',
    status: 'paid',
    paymentDate: '2026-09-13',
  },
  {
    id: 'payment-3',
    memberId: 'member-3',
    memberName: 'Michael Brown',
    memberEmail: 'michael@example.com',
    memberSubscriptionId: 'subscription-4',
    planName: 'Annual Membership',
    amount: 400,
    currency: 'EUR',
    method: 'bank-transfer',
    status: 'paid',
    paymentDate: '2026-09-12',
    reference: 'TRX-89342',
  },
  {
    id: 'payment-4',
    memberId: 'member-4',
    memberName: 'David Wilson',
    memberEmail: 'david@example.com',
    memberSubscriptionId: 'subscription-5',
    planName: 'Premium Membership',
    amount: 60,
    currency: 'EUR',
    method: 'card',
    status: 'pending',
    paymentDate: '2026-09-11',
  },
  {
    id: 'payment-5',
    memberId: 'member-5',
    memberName: 'Emma Davis',
    memberEmail: 'emma@example.com',
    memberSubscriptionId: 'subscription-6',
    planName: 'Monthly Membership',
    amount: 40,
    currency: 'EUR',
    method: 'cash',
    status: 'paid',
    paymentDate: '2026-09-10',
  },
  {
    id: 'payment-6',
    memberId: 'member-6',
    memberName: 'Alex Taylor',
    memberEmail: 'alex@example.com',
    memberSubscriptionId: 'subscription-7',
    planName: 'Monthly Membership',
    amount: 40,
    currency: 'EUR',
    method: 'card',
    status: 'refunded',
    paymentDate: '2026-09-08',
    reference: 'REF-1122',
  },
]

export const Payments: React.FC = () => {
  const router = useRouter()

  const [payments] = useState<Payment[]>(MOCK_PAYMENTS)

  const [search, setSearch] = useState('')
  const [method, setMethod] = useState<PaymentMethodFilter>('all')
  const [status, setStatus] = useState<PaymentStatusFilter>('all')

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    return payments.filter((payment) => {
      const matchesSearch =
        !normalizedSearch ||
        payment.memberName.toLowerCase().includes(normalizedSearch) ||
        payment.memberEmail.toLowerCase().includes(normalizedSearch)

      const matchesMethod = method === 'all' || payment.method === method

      const matchesStatus = status === 'all' || payment.status === status

      return matchesSearch && matchesMethod && matchesStatus
    })
  }, [payments, search, method, status])

  const totalRevenue = payments
    .filter((payment) => payment.status === 'paid')
    .reduce((total, payment) => total + payment.amount, 0)

  const thisMonth = payments
    .filter((payment) => {
      return (
        payment.status === 'paid' && payment.paymentDate.startsWith('2026-09')
      )
    })
    .reduce((total, payment) => total + payment.amount, 0)

  const paidCount = payments.filter(
    (payment) => payment.status === 'paid',
  ).length

  const pendingCount = payments.filter(
    (payment) => payment.status === 'pending',
  ).length

  const handleAddPayment = () => {
    router.push('/payments/new')
  }

  const handleViewPayment = (payment: Payment) => {
    console.log('View payment:', payment)
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Payments</h1>

            <p className={styles.description}>
              Track payments received from gym members.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddPayment}
            className={styles.addButton}
          >
            <Plus size={18} />
            <span className="ml-2">Add Payment</span>
          </button>
        </header>

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total Revenue</p>

            <p className={styles.statValue}>€{totalRevenue.toFixed(2)}</p>

            <p className={styles.statDescription}>All paid payments</p>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>This Month</p>

            <p className={styles.statValue}>€{thisMonth.toFixed(2)}</p>

            <p className={styles.statDescription}>September 2026</p>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Paid</p>

            <p className={styles.statValue}>{paidCount}</p>

            <p className={styles.statDescription}>Completed payments</p>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statLabel}>Pending</p>

            <p className={styles.statValue}>{pendingCount}</p>

            <p className={styles.statDescription}>
              Payments requiring attention
            </p>
          </div>
        </section>

        <PaymentFilters
          search={search}
          method={method}
          status={status}
          onSearchChange={setSearch}
          onMethodChange={setMethod}
          onStatusChange={setStatus}
        />

        <section className={styles.paymentsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Payment History</h2>
          </div>

          {filteredPayments.length > 0 ? (
            <div className={styles.paymentGrid}>
              {filteredPayments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  onView={handleViewPayment}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No payments found</p>

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
