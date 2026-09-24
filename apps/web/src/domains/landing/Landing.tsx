import React from 'react'
import { styles } from './Landing.styled'

import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { MobileApp } from './components/MobileApp/MobileApp'
import { Footer } from './components/Footer/Footer'
import { MembershipPlans } from './components/MembershipPlans/MembershipPlans'

export const Landing: React.FC = () => {
  return (
    <main className={styles.page}>
      <Hero />
      <About />
      <MembershipPlans />
      <MobileApp />
      <Footer />
    </main>
  )
}
