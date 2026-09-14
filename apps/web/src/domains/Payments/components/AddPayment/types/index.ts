export interface MockMember {
  id: string
  name: string
  email: string
}

export interface MockSubscription {
  id: string
  memberId: string
  planName: string
  price: number
  currency: string
  status: 'active' | 'expiring' | 'expired'
}
