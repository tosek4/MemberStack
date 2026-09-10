export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  termsAccepted: boolean
}

export interface RegisterScreenProps {
  title?: string
  onSubmit?: (data: RegisterFormData) => Promise<void> | void
  onSignIn?: () => void
  loading?: boolean
}