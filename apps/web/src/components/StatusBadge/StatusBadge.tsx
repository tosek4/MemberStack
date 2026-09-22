import React from 'react'

import { styles } from './StatusBadge.styled'
import { StatusBadgeProps } from './types'
import { LABELS } from './utils/labels'
import { statusStyles } from './utils'

export const StatusBadge: React.FC<StatusBadgeProps> = ({ value, label }) => {
  return (
    <span className={`${styles.base} ${statusStyles[value]}`}>
      {label ?? LABELS[value]}
    </span>
  )
}
