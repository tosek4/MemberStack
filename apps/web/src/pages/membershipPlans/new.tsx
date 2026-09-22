import { MembershipPlanForm } from '@domain/MembershipPlans/components/MembershipPlanForm'

export default function NewMembershipPlanPage() {
  return (
    <main className="m-4">
      <h1>Add Membership Plan</h1>

      <p>Create a new membership plan for your members.</p>

      <MembershipPlanForm />
    </main>
  )
}
