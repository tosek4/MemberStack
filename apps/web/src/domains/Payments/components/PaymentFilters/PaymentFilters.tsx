import React from 'react'
import { CreditCard, Search, Wallet, X } from 'lucide-react'

import type {
  PaymentFiltersProps,
  PaymentMethodFilter,
  PaymentStatusFilter,
} from '../../types'

import {
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from '../../utils/labels'

import { styles } from './PaymentFilters.styled'

export const PaymentFilters: React.FC<PaymentFiltersProps> = ({
  search,
  method,
  status,
  onSearchChange,
  onMethodChange,
  onStatusChange,
}) => {
  const handleMethodChange = (value: string) => {
    onMethodChange(value as PaymentMethodFilter)
  }

  const handleStatusChange = (value: string) => {
    onStatusChange(value as PaymentStatusFilter)
  }

  return (
    <div className={styles.container}>
      <div className={styles.search.wrapper}>
        <Search className={styles.search.icon} size={18} />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by member name or email..."
          className={styles.search.input}
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className={styles.search.clear}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <div className={styles.select.wrapper}>
          <Wallet size={16} className={styles.select.icon} />

          <select
            value={method}
            onChange={(event) => handleMethodChange(event.target.value)}
            className={styles.select.input}
          >
            <option value="all">All Methods</option>

            {Object.entries(PAYMENT_METHOD_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.select.wrapper}>
          <CreditCard size={16} className={styles.select.icon} />

          <select
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
            className={styles.select.input}
          >
            <option value="all">All Statuses</option>

            {Object.entries(PAYMENT_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
