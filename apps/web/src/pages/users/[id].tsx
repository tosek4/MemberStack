import { UserForm } from '@/domains/Users/components'
import { useRouter } from 'next/router'

export default function EditUserPage() {
  const router = useRouter()

  const id = Number(router.query.id)

  return <UserForm  userId={id} />
}
