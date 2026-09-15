import { useRouter } from 'next/router'

import {
  MembershipPlanForm,
  MembershipPlanFormData,
} from '@domain/MembershipPlans/components/MembershipPlanForm'

export default function EditMembershipPlanPage() {
  const router = useRouter()
  const { id } = router.query

  // Later this will come from API
  const plan = {
    id: id as string,
    name: 'Premium',
    price: 50,
    durationDays: 30,
    description: 'Full access to the gym.',
  }

  const handleSubmit = async (data: MembershipPlanFormData) => {
    console.log('UPDATE', id, data)

    // Later:
    // await membershipPlanService.update(id, data)

    router.push('/membership-plans')
  }

  return (
    <main className="m-4">
      <h1>Edit Membership Plan</h1>

      <p>Update the membership plan details.</p>

      <MembershipPlanForm
        initialValues={{
          name: plan.name,
          price: plan.price,
          durationDays: plan.durationDays,
          description: plan.description,
        }}
        submitLabel="Save changes"
        loadingLabel="Saving..."
        onSubmit={handleSubmit}
      />
    </main>
  )
}
