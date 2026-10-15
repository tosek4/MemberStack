import React from 'react'

import { styles } from './Footer.styled'
import { footerProps } from '../../types'

export const Footer: React.FC<footerProps> = ({
  gymName,
  email,
  phone,
  address,
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>{gymName ?? ''}</div>
        {email && (
          <a href={`mailto:${email}`} className={styles.text}>
            {email}
          </a>
        )}

        {phone && (
          <a href={`tel:${phone}`} className={styles.text}>
            {phone}
          </a>
        )}

        {address && <p className={styles.text}>{address}</p>}

        <p className={styles.copyright}>
          © {new Date().getFullYear()}
          {gymName ? ` ${gymName}.` : '.'} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
