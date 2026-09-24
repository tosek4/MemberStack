export interface MembershipPlanFormData {
  name: string
  price: number
  duration: number
  description: string
  status: 'active' | 'inactive'
  isDailyPlan: boolean
}

export interface MembershipPlanFormProps {
  initialValues?: Partial<MembershipPlanFormData>
  planId?: number
}
