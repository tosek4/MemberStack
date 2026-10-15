import React from 'react'
import { useFormContext } from 'react-hook-form'

import { LABELS } from '../../utils/labels'
import { styles } from './SecuritySettings.styled'
import { SettingsData } from '../../types'

export const SecuritySettings: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SettingsData>()

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <label className={styles.label}>{LABELS.security.sessionTimeout}</label>

        <select
          className={styles.select}
          {...register('security.sessionTimeout', {
            required: 'Session timeout is required',
            valueAsNumber: true,
          })}
        >
          <option value={15}>{LABELS.session.minutes15}</option>
          <option value={30}>{LABELS.session.minutes30}</option>
          <option value={60}>{LABELS.session.hour1}</option>
          <option value={120}>{LABELS.session.hours2}</option>
          <option value={240}>{LABELS.session.hours4}</option>
        </select>

        {errors.security?.sessionTimeout && (
          <p className={styles.error}>
            {errors.security.sessionTimeout.message}
          </p>
        )}

        <p className={styles.help}>{LABELS.security.sessionTimeoutHelp}</p>
      </div>
    </div>
  )
}
