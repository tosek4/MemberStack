import { UserProfile as LoopbackUserProfile } from '@loopback/security'

export interface UserProfile extends LoopbackUserProfile {
  id?: string | number
  email?: string
  role?: string
  type?: string
  firstName?: string
  lastName?: string
}
