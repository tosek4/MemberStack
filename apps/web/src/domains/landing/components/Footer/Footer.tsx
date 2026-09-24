import React from 'react'

import {styles} from './Footer.styled'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          MEMBER<span>STACK</span>
        </div>

        <p className={styles.text}>
          Train hard. Live strong.
        </p>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} MemberStack. All rights reserved.
        </p>
      </div>
    </footer>
  )
}