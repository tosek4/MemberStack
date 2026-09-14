import React from 'react'
import { Pencil, Trash2 } from 'lucide-react'

import { MembershipPlanCardProps } from '../../types'

import { styles } from './MembershipPlanCard.styled'
import { LABELS } from '../../utils/labels'

export const MembershipPlanCard: React.FC<MembershipPlanCardProps> = ({
  plan,
  onEdit,
  onDelete,
}) => {
  const isActive = plan.status === 'active'

  return (
    <article className={styles.root}>
      <div className={styles.header.wrapper}>
        <div>
          <div className={styles.header.titleRow}>
            <h2 className={styles.header.title}>{plan.name}</h2>

            <span
              className={`${styles.status.base} ${
                isActive ? styles.status.active : styles.status.inactive
              }`}
            >
              {isActive ? LABELS.active : LABELS.inactive}
            </span>
          </div>

          {plan.description && (
            <p className={styles.description}>{plan.description}</p>
          )}
        </div>
      </div>

      <div className={styles.price.wrapper}>
        <span className={styles.price.amount}>
          {plan.currency}
          {plan.price}
        </span>

        <span className={styles.price.period}>/ {LABELS.month}</span>
      </div>

      <div className={styles.details.wrapper}>
        <div className={styles.details.item}>
          <span className={styles.details.label}>{LABELS.duration}</span>

          <span className={styles.details.value}>
            {plan.durationDays} {LABELS.days}
          </span>
        </div>

        <div className={styles.details.item}>
          <span className={styles.details.label}>{LABELS.activeMembers}</span>

          <span className={styles.details.value}>{plan.activeMembers}</span>
        </div>
      </div>

      <div className={styles.actions.wrapper}>
        <button
          type="button"
          className={styles.actions.edit}
          onClick={() => onEdit?.(plan)}
        >
          <Pencil size={16} />
          {LABELS.edit}
        </button>

        <button
          type="button"
          className={styles.actions.delete}
          onClick={() => onDelete?.(plan)}
        >
          <Trash2 size={16} />
          {LABELS.delete}
        </button>
      </div>
    </article>
  )
}
