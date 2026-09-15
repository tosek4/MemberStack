export interface MembershipPlanFormData {
  name: string
  price: number
  durationDays: number
  description: string
}

export interface MembershipPlanFormProps {
  initialValues?: Partial<MembershipPlanFormData>
  loading?: boolean
  submitLabel: string
  loadingLabel: string
  onSubmit: (data: MembershipPlanFormData) => Promise<void> | void
}
