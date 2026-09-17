export interface MembershipPlanFormData {
  name: string
  price: number
  duration: number
  description: string
}

export interface MembershipPlanFormProps {
  initialValues?: Partial<MembershipPlanFormData>
  planId?: number
}
