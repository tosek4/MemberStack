import React, { useState } from 'react'

import { PaymentMethod, PaymentMethodModalProps } from './types'
import { styles } from './PaymentMethodModal.styled'
import { paymentMethods } from './utils'

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('')

  if (!open) {
    return null
  }

  const handleConfirm = () => {
    if (!paymentMethod) {
      return
    }

    onConfirm(paymentMethod)
  }

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-method-title"
      >
        <div className={styles.header}>
          <h2 id="payment-method-title" className={styles.title}>
            Payment Method
          </h2>

          <p className={styles.description}>
            Select how the member paid for this subscription.
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Payment method</label>

          <select
            value={paymentMethod}
            onChange={(event) =>
              setPaymentMethod(event.target.value as PaymentMethod)
            }
            disabled={loading}
            className={styles.select}
          >
            <option value="" disabled>
              Select payment method
            </option>

            {paymentMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={styles.cancelButton}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!paymentMethod || loading}
            className={styles.confirmButton}
          >
            {loading ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  )
}
