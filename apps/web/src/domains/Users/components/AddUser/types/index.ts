import { UserRole } from '../../../types'

export interface AddUserFormData {
  name: string
  email: string
  phone: string
  role: UserRole
  password: string
}