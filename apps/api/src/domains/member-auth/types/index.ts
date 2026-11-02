import { Member } from '../../member/models'

export interface MemberData {
  id: number
  member: Member
  subscription?: {
    id?: number
    status?: string
    startedAt?: Date | undefined
    expiresAt?: Date | undefined
    plan: {
      id?: number
      name: string
      description?: string
      price: number
      duration: number
    }
  }
}

export interface MemberSubscriptionData {
  id?: number
  status?: string
  startedAt?: Date | undefined
  expiresAt?: Date | undefined
  membershipPlan?: {
    id?: number
    name: string
    description?: string
    price: number
    duration: number
  }
}

export interface MemberCheckInHistoryItem {
  id: number
  checkIn: Date
  checkOut: Date | null
  status: 'checked-in' | 'checked-out'
}

export interface PaginationParams {
  limit?: number
  offset?: number
}

export interface PaginationMetadata {
  limit: number
  offset: number
  total: number
  hasMore: boolean
}

export interface MemberCheckInHistoryResponse {
  checkIns: MemberCheckInHistoryItem[]
  pagination: {
    limit: number
    offset: number
    total: number
    hasMore: boolean
  }
}
