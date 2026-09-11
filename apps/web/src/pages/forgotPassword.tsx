import { ForgotPassword } from '@/domains/Auth/ForgotPassword/ForgotPassword'
import { useRouter } from 'next/router'

export default function ForgotPasswordPage() {
  const router = useRouter()

  const handleSubmit = async (email: string) => {
    console.log('Forgot password:', email)

    // Connect to auth service later
  }

  const handleBackToLogin = () => {
    router.push('/login')
  }

  return (
    <ForgotPassword onSubmit={handleSubmit} onBackToLogin={handleBackToLogin} />
  )
}
