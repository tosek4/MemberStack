export interface AddMembershipPlanFormData {
  name: string
  price: number
  durationDays: number
  description: string
}

export interface AddMembershipPlanProps {
  loading?: boolean
  onSubmit?: (data: AddMembershipPlanFormData) => Promise<void> | void
}
