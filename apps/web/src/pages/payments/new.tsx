import { AddPayment } from '@/domains/Payments/components'
import { AddPaymentFormData } from '@/domains/Payments/types'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const AddPaymentPage: NextPage = () => {
  const router = useRouter()

  const handleSubmit = async (data: AddPaymentFormData) => {
    console.log('Payment:', data)

    router.push('/payments')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <AddPayment onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default AddPaymentPage
