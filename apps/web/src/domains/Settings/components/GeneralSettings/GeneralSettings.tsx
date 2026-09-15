import React from 'react'

import { LABELS } from '../../utils/labels'
import { GeneralSettingsProps } from './types'
import { styles } from './GeneralSettings.styled'

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
  onChange,
}) => {
  const update = <K extends keyof typeof settings>(
    field: K,
    value: (typeof settings)[K],
  ) => {
    onChange({
      ...settings,
      [field]: value,
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label}>{LABELS.general.gymName}</label>

          <input
            type="text"
            value={settings.gymName}
            className={styles.input}
            onChange={(e) => update('gymName', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{LABELS.general.email}</label>

          <input
            type="email"
            value={settings.email}
            className={styles.input}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{LABELS.general.phone}</label>

          <input
            type="tel"
            value={settings.phone}
            className={styles.input}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{LABELS.general.currency}</label>

          <select
            value={settings.currency}
            className={styles.select}
            onChange={(e) => update('currency', e.target.value)}
          >
            <option value="EUR">{LABELS.currency.eur}</option>
            <option value="USD">{LABELS.currency.usd}</option>
            <option value="GBP">{LABELS.currency.gbp}</option>
            <option value="MKD">{LABELS.currency.mkd}</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{LABELS.general.address}</label>

        <input
          type="text"
          value={settings.address}
          className={styles.input}
          onChange={(e) => update('address', e.target.value)}
        />
      </div>
    </div>
  )
}
