export interface ForgotPasswordProps {
  title?: string
  loading?: boolean
  onSubmit?: (email: string) => void | Promise<void>
  onBackToLogin?: () => void
}
