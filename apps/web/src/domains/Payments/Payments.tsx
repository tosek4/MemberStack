import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/router'

import type { Payment, PaymentMethodFilter, PaymentStatusFilter } from './types'

import { styles } from './Payments.styled'
import { PaymentCard, PaymentFilters } from './components'
import { usePayments } from './services'
import { useDebounce } from '@/hooks/useDebounce'

export const Payments: React.FC = () => {
  const router = useRouter()
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const [search, setSearch] = useState('')
  const [method, setMethod] = useState<PaymentMethodFilter>('all')
  const [status, setStatus] = useState<PaymentStatusFilter>('all')

  const debouncedSearch = useDebounce(search, 400)

  const { data: allPayments = [] } = usePayments()

  const {
    data: payments = [],
    isPending,
    isFetching,
    isError,
  } = usePayments({
    search: debouncedSearch,
    method,
    status,
  })

  const totalRevenue = allPayments
    .filter((payment) => payment.status === 'paid')
    .reduce((total, payment) => total + payment.amount, 0)

  const thisMonth = allPayments
    .filter((payment) => {
      const paymentDate = new Date(payment.paymentDate)

      return (
        payment.status === 'paid' &&
        paymentDate.getFullYear() === currentYear &&
        paymentDate.getMonth() === currentMonth
      )
    })
    .reduce((total, payment) => total + payment.amount, 0)

  const paidCount = allPayments.filter(
    (payment) => payment.status === 'paid',
  ).length

  const pendingCount = allPayments.filter(
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

        {isFetching && !isPending && (
          <p className={styles.emptyDescription}>Searching...</p>
        )}

        <section className={styles.paymentsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Payment History</h2>
          </div>

          {isPending ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Loading payments...</p>
            </div>
          ) : isError ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Failed to load payments</p>

              <p className={styles.emptyDescription}>Please try again later.</p>
            </div>
          ) : payments.length > 0 ? (
            <div className={styles.paymentGrid}>
              {payments.map((payment) => (
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
