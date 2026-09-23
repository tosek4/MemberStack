
export interface UserFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  roleId: number
  isActive: boolean
  password?: string
}

export interface UserFormProps {
  userId?: number
}
