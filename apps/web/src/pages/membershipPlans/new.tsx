import { useRouter } from 'next/router'

import {
  MembershipPlanForm,
  MembershipPlanFormData,
} from '@domain/MembershipPlans/components/MembershipPlanForm'

export default function NewMembershipPlanPage() {
  const router = useRouter()

  const handleSubmit = async (data: MembershipPlanFormData) => {
    console.log('CREATE', data)

    // Later:
    // await membershipPlanService.create(data)

    router.push('/membership-plans')
  }

  return (
    <main className="m-4">
      <h1>Add Membership Plan</h1>

      <p>Create a new membership plan for your members.</p>

      <MembershipPlanForm
        submitLabel="Create plan"
        loadingLabel="Creating..."
        onSubmit={handleSubmit}
      />
    </main>
  )
}
