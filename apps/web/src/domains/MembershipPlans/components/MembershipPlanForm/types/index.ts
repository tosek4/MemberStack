export interface MembershipPlanFormData {
  name: string
  price: number
  duration: number
  description: string
  status: 'active' | 'inactive'
}

export interface MembershipPlanFormProps {
  initialValues?: Partial<MembershipPlanFormData>
  planId?: number
}
