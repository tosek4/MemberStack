import React from 'react'

import { LABELS } from '../../utils/labels'
import { SecuritySettingsProps } from './types'
import { styles } from './SecuritySettings.styled'

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  settings,
  onChange,
  onChangePassword,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <label className={styles.label}>{LABELS.security.sessionTimeout}</label>

        <select
          value={settings.sessionTimeout}
          className={styles.select}
          onChange={(e) =>
            onChange({
              ...settings,
              sessionTimeout: Number(e.target.value),
            })
          }
        >
          <option value={15}>{LABELS.session.minutes15}</option>
          <option value={30}>{LABELS.session.minutes30}</option>
          <option value={60}>{LABELS.session.hour1}</option>
          <option value={120}>{LABELS.session.hours2}</option>
          <option value={240}>{LABELS.session.hours4}</option>
        </select>

        <p className={styles.help}>{LABELS.security.sessionTimeoutHelp}</p>
      </div>

      <div className={styles.password.wrapper}>
        <div>
          <p className={styles.password.title}>
            {LABELS.security.changePassword}
          </p>

          <p className={styles.password.description}>
            {LABELS.security.changePasswordDescription}
          </p>
        </div>

        <button
          type="button"
          className={styles.password.button}
          onClick={onChangePassword}
        >
          {LABELS.security.changePasswordButton}
        </button>
      </div>
    </div>
  )
}
