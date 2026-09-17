import { useRouter } from 'next/router'

import { MembershipPlanForm } from '@domain/MembershipPlans/components/MembershipPlanForm'
import { useMembershipPlan } from '@/domains/MembershipPlans/services'

export default function EditMembershipPlanPage() {
  const router = useRouter()

  const { id } = router.query

  const planId = Number(id)

  const { data: membershipPlan, isLoading, isError } = useMembershipPlan(planId)

  if (!router.isReady || isLoading) {
    return (
      <main className="m-4">
        <p>Loading membership plan...</p>
      </main>
    )
  }

  if (isError || !membershipPlan) {
    return (
      <main className="m-4">
        <h1>Membership plan not found</h1>
        <p>The membership plan could not be loaded.</p>
      </main>
    )
  }

  return (
    <main className="m-4">
      <h1>Edit Membership Plan</h1>

      <p>Update the membership plan details.</p>

      <MembershipPlanForm
        planId={membershipPlan.id}
        initialValues={{
          name: membershipPlan.name,
          price: membershipPlan.price,
          duration: membershipPlan.duration,
          description: membershipPlan.description ?? '',
        }}
      />
    </main>
  )
}
