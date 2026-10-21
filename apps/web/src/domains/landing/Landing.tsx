import React from 'react'
import { styles } from './Landing.styled'

import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { MobileApp } from './components/MobileApp/MobileApp'
import { Footer } from './components/Footer/Footer'
import { MembershipPlans } from './components/MembershipPlans/MembershipPlans'
import { usePublicSettings } from './services/publicSettings.queries'

export const Landing: React.FC = () => {
  const { data: settings } = usePublicSettings()
  return (
    <main className={styles.page}>
      <Hero gymName={settings?.gymName} />
      <About />
      <MembershipPlans currency={settings?.currency} />
      <MobileApp gymName={settings?.gymName} />
      <Footer
        gymName={settings?.gymName}
        email={settings?.email}
        phone={settings?.phone}
        address={settings?.address}
      />
    </main>
  )
}
