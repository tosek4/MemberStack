import React, { useState } from 'react'

import {
  GeneralSettings,
  MembershipSettings,
  SecuritySettings,
} from './components'

import { SettingsData } from './types'
import { LABELS } from './utils/labels'
import { styles } from './Settings.styled'

const initialSettings: SettingsData = {
  general: {
    gymName: 'MemberStack Gym',
    email: 'info@memberstack.com',
    phone: '+389 70 123 456',
    address: 'Skopje, North Macedonia',
    currency: 'EUR',
  },

  membership: {
    defaultDuration: 1,
    expiringSoonDays: 7,
    gracePeriodDays: 0,
  },

  security: {
    sessionTimeout: 60,
  },
}

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>(initialSettings)

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)

    // Mock save for now.
    console.log('Save settings:', settings)

    await new Promise((resolve) => setTimeout(resolve, 500))

    setSaving(false)
  }

  const handleCancel = () => {
    setSettings(initialSettings)
  }

  const updateGeneral = (value: SettingsData['general']) => {
    setSettings((current) => ({
      ...current,
      general: value,
    }))
  }

  const updateMembership = (value: SettingsData['membership']) => {
    setSettings((current) => ({
      ...current,
      membership: value,
    }))
  }

  const updateSecurity = (value: SettingsData['security']) => {
    setSettings((current) => ({
      ...current,
      security: value,
    }))
  }

  return (
    <main className={styles.root}>
      <header className={styles.header.wrapper}>
        <h1 className={styles.header.title}>{LABELS.title}</h1>

        <p className={styles.header.subtitle}>{LABELS.subtitle}</p>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{LABELS.general.title}</h2>

          <p className={styles.sectionDescription}>
            {LABELS.general.description}
          </p>
        </div>

        <div className={styles.sectionBody}>
          <GeneralSettings
            settings={settings.general}
            onChange={updateGeneral}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{LABELS.membership.title}</h2>

          <p className={styles.sectionDescription}>
            {LABELS.membership.description}
          </p>
        </div>

        <div className={styles.sectionBody}>
          <MembershipSettings
            settings={settings.membership}
            onChange={updateMembership}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{LABELS.security.title}</h2>

          <p className={styles.sectionDescription}>
            {LABELS.security.description}
          </p>
        </div>

        <div className={styles.sectionBody}>
          <SecuritySettings
            settings={settings.security}
            onChange={updateSecurity}
            onChangePassword={() => {
              console.log('Change password')
            }}
          />
        </div>
      </section>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.button.cancel}
          onClick={handleCancel}
          disabled={saving}
        >
          {LABELS.actions.cancel}
        </button>

        <button
          type="button"
          className={styles.button.save}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? LABELS.actions.saving : LABELS.actions.save}
        </button>
      </div>
    </main>
  )
}
