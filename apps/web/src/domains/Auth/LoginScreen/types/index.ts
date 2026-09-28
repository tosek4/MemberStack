export interface LoginFormData {
  email: string
  password: string
  remember: boolean
}

export interface LoginScreenProps {
  logoSrc?: string
  logoAlt?: string
  brandName?: string
  title?: string
  onSubmit?: (values: LoginFormData) => void | Promise<void>
  onForgotPassword?: () => void
  onSignUp?: () => void
  loading?: boolean
}
