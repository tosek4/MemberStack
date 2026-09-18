import { AddPayment } from '@/domains/Payments/components'
import type { NextPage } from 'next'

const AddPaymentPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <AddPayment />
      </div>
    </div>
  )
}

export default AddPaymentPage
