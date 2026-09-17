import React, { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/router'

import { MembershipPlanCard } from './components/MembershipPlanCard'
import { MembershipPlan } from './types'
import { LABELS } from './utils/labels'

import { styles } from './MembershipPlans.styled'
import { useDeleteMembershipPlan, useMembershipPlans } from './services'
import { Modal } from '@/components/Modal'

export const MembershipPlans: React.FC = () => {
  const router = useRouter()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteMemberPlanId, setDeleteMemberPlanId] = useState(
    null as number | null,
  )
  const { data: membersPlans = [], isLoading, isError } = useMembershipPlans()
  const deleteMembershipPlan = useDeleteMembershipPlan()

  const activePlans = useMemo(
    () => membersPlans.filter((plan) => plan.status === 'active'),
    [membersPlans],
  )

  const handleEdit = (plan: MembershipPlan) => {
    router.push(`/membershipPlans/${plan.id}`)
  }

  const handleDelete = (planId: number) => {
    setDeleteMemberPlanId(planId)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = (planId: number) => {
    setDeleteModalOpen(false)
    deleteMembershipPlan.mutate(planId, {
      onSuccess: () => {
        setDeleteModalOpen(false)
        setDeleteMemberPlanId(null)
      },
    })
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setDeleteMemberPlanId(null)
  }

  if (isLoading) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Loading membership plans...</p>
          </div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Failed to load membership plans</p>

            <p className={styles.emptyText}>Please try again later.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header.wrapper}>
          <div>
            <h1 className={styles.header.title}>{LABELS.title}</h1>

            <p className={styles.header.subtitle}>{LABELS.subtitle}</p>
          </div>

          <button
            type="button"
            className={styles.header.addButton}
            onClick={() => router.push('/membershipPlans/new')}
          >
            <Plus size={18} />
            {LABELS.addPlan}
          </button>
        </div>

        {activePlans.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>{LABELS.emptyTitle}</h2>

            <p className={styles.emptyText}>{LABELS.emptyText}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {membersPlans.map((plan) => (
              <MembershipPlanCard
                key={plan.id}
                plan={plan}
                onEdit={handleEdit}
                onDelete={handleDelete}
                openDeleteModal={() => setDeleteModalOpen(true)}
              />
            ))}
          </div>
        )}
      </div>
      <Modal
        open={deleteModalOpen}
        title="Delete membership plan"
        description={`Are you sure you want to delete? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteMembershipPlan.isPending}
        onConfirm={() => handleConfirmDelete(deleteMemberPlanId!)}
        onCancel={() => handleCancelDelete()}
      />
    </main>
  )
}
