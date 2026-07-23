import { AttendanceWithRelations } from "../../attendance/models"
import { MemberSubscriptionWithRelations } from "../../member-subscription/models"
import { PaymentWithRelations } from "../../payment/models"
import { UserWithRelations } from "../../user/models"

export interface MemberRelations {
  createdBy?: UserWithRelations
  attendances?: AttendanceWithRelations[]
  payments?: PaymentWithRelations[]
  subscriptions?: MemberSubscriptionWithRelations[]
}