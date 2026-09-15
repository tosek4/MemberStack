import React from 'react'

import { LABELS } from '../../utils/labels'
import { MembershipSettingsProps } from './types'
import { styles } from './MembershipSettings.styled'

export const MembershipSettings: React.FC<MembershipSettingsProps> = ({
  settings,
  onChange,
}) => {
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
            value={settings.defaultDuration}
            className={styles.input}
            onChange={(e) =>
              onChange({
                ...settings,
                defaultDuration: Number(e.target.value),
              })
            }
          />

          <p className={styles.help}>{LABELS.membership.defaultDurationHelp}</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            {LABELS.membership.expiringSoonDays}
          </label>

          <input
            type="number"
            min={1}
            value={settings.expiringSoonDays}
            className={styles.input}
            onChange={(e) =>
              onChange({
                ...settings,
                expiringSoonDays: Number(e.target.value),
              })
            }
          />

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
            value={settings.gracePeriodDays}
            className={styles.input}
            onChange={(e) =>
              onChange({
                ...settings,
                gracePeriodDays: Number(e.target.value),
              })
            }
          />

          <p className={styles.help}>{LABELS.membership.gracePeriodDaysHelp}</p>
        </div>
      </div>
    </div>
  )
}
