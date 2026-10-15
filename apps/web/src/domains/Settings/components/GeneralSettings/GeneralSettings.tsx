import React from 'react'
import { useFormContext } from 'react-hook-form'

import { LABELS } from '../../utils/labels'
import { styles } from './GeneralSettings.styled'
import { SettingsData } from '../../types'

export const GeneralSettings: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SettingsData>()

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label}>{LABELS.general.gymName}</label>

          <input
            type="text"
            className={styles.input}
            {...register('general.gymName', {
              required: 'Gym name is required',
            })}
          />

          {errors.general?.gymName && (
            <p className={styles.error}>{errors.general.gymName.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{LABELS.general.email}</label>

          <input
            type="email"
            className={styles.input}
            {...register('general.email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
          />

          {errors.general?.email && (
            <p className={styles.error}>{errors.general.email.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{LABELS.general.phone}</label>

          <input
            type="tel"
            className={styles.input}
            {...register('general.phone', {
              required: 'Phone is required',
            })}
          />

          {errors.general?.phone && (
            <p className={styles.error}>{errors.general.phone.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{LABELS.general.currency}</label>

          <select
            className={styles.select}
            {...register('general.currency', {
              required: 'Currency is required',
            })}
          >
            <option value="">Select currency</option>
            <option value="EUR">{LABELS.currency.eur}</option>
            <option value="USD">{LABELS.currency.usd}</option>
            <option value="GBP">{LABELS.currency.gbp}</option>
            <option value="MKD">{LABELS.currency.mkd}</option>
          </select>

          {errors.general?.currency && (
            <p className={styles.error}>{errors.general.currency.message}</p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{LABELS.general.address}</label>

        <input
          type="text"
          className={styles.input}
          {...register('general.address', {
            required: 'Address is required',
          })}
        />

        {errors.general?.address && (
          <p className={styles.error}>{errors.general.address.message}</p>
        )}
      </div>
    </div>
  )
}
