import React from 'react'
import { useFormContext } from 'react-hook-form'

import { LABELS } from '../../utils/labels'
import { styles } from './MembershipSettings.styled'
import { SettingsData } from '../../types'

export const MembershipSettings: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SettingsData>()

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label}>
            {LABELS.membership.defaultDuration}
          </label>

          <input
            type="number"
            min={1}
            className={styles.input}
            {...register('membership.defaultDuration', {
              required: 'Default duration is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Must be at least 1' },
            })}
          />

          {errors.membership?.defaultDuration && (
            <p className={styles.error}>
              {errors.membership.defaultDuration.message}
            </p>
          )}

          <p className={styles.help}>{LABELS.membership.defaultDurationHelp}</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            {LABELS.membership.expiringSoonDays}
          </label>

          <input
            type="number"
            min={1}
            className={styles.input}
            {...register('membership.expiringSoonDays', {
              required: 'Expiring soon days is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Must be at least 1' },
            })}
          />

          {errors.membership?.expiringSoonDays && (
            <p className={styles.error}>
              {errors.membership.expiringSoonDays.message}
            </p>
          )}

          <p className={styles.help}>
            {LABELS.membership.expiringSoonDaysHelp}
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            {LABELS.membership.gracePeriodDays}
          </label>

          <input
            type="number"
            min={0}
            className={styles.input}
            {...register('membership.gracePeriodDays', {
              valueAsNumber: true,
              min: { value: 0, message: 'Cannot be negative' },
            })}
          />

          {errors.membership?.gracePeriodDays && (
            <p className={styles.error}>
              {errors.membership.gracePeriodDays.message}
            </p>
          )}

          <p className={styles.help}>{LABELS.membership.gracePeriodDaysHelp}</p>
        </div>
      </div>
    </div>
  )
}
