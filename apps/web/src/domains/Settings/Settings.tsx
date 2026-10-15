import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getApiErrorMessage } from '@/utils/apiError'

import {
  GeneralSettings,
  MembershipSettings,
  SecuritySettings,
} from './components'

import { getSettings, updateSettings } from './services/settings.service'
import { SettingsData } from './types'
import { LABELS } from './utils/labels'
import { styles } from './Settings.styled'

export const Settings: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const methods = useForm<SettingsData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const { handleSubmit, reset } = methods

  useEffect(() => {
    let isMounted = true

    const loadSettings = async () => {
      try {
        const data = await getSettings()

        if (isMounted && data) {
          reset(data)
        }
      } catch (error) {
        if (isMounted) {
          toast.error(getApiErrorMessage(error))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadSettings()

    return () => {
      isMounted = false
    }
  }, [reset])

  const onSubmit = async (data: SettingsData) => {
    setSaving(true)

    try {
      const updated = await updateSettings(data)

      reset(updated ?? data)

      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    reset()
  }

  return (
    <main className={styles.root}>
      <header className={styles.header.wrapper}>
        <h1 className={styles.header.title}>{LABELS.title}</h1>
        <p className={styles.header.subtitle}>{LABELS.subtitle}</p>
      </header>

      {loading ? (
        <p role="status">Loading settings...</p>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{LABELS.general.title}</h2>
                <p className={styles.sectionDescription}>
                  {LABELS.general.description}
                </p>
              </div>

              <div className={styles.sectionBody}>
                <GeneralSettings />
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  {LABELS.membership.title}
                </h2>
                <p className={styles.sectionDescription}>
                  {LABELS.membership.description}
                </p>
              </div>

              <div className={styles.sectionBody}>
                <MembershipSettings />
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
                <SecuritySettings />
              </div>
            </section>

            <div className={styles.footer}>
              <button
                type="button"
                className={styles.button.cancel}
                onClick={handleCancel}
                disabled={loading || saving}
              >
                {LABELS.actions.cancel}
              </button>

              <button
                type="submit"
                className={styles.button.save}
                disabled={loading || saving}
              >
                {saving ? LABELS.actions.saving : LABELS.actions.save}
              </button>
            </div>
          </form>
        </FormProvider>
      )}
    </main>
  )
}
