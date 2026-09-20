import { AttendanceWithRelations } from '../../attendance/models'
import { MemberWithRelations } from '../../member/models'
import { PaymentWithRelations } from '../../payment/models'
import { RefreshTokenWithRelations } from '../../refresh-token/models'
import { RoleWithRelations } from '../../role/models'
export * from './dto'
export * from './user-profile'

export interface UserRelations {
  role?: RoleWithRelations
  refreshTokens?: RefreshTokenWithRelations[]
  members?: MemberWithRelations[]
  payments?: PaymentWithRelations[]
  attendances?: AttendanceWithRelations[]
}

export type UserStatus = 'active' | 'inactive'

export interface UserListFilters {
  search?: string
  role?: string | 'all'
  status?: UserStatus | 'all'
}
