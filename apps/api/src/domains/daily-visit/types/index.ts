import { PaymentMethod } from '../../payment/types'
import { DailyVisit } from '../models'

export interface CreateDailyVisitData {
  membershipPlanId: number
}

export interface DailyVisitService {
  createDailyVisit(data: CreateDailyVisitData): Promise<DailyVisit>
}

export interface CreateDailyVisitPayload {
  firstName: string
  lastName: string
  phone: string
  membershipPlanId: number
  paymentMethod: PaymentMethod
}
