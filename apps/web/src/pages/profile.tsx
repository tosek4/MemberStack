import { EditProfile } from '@/domains/Profile/EditProfile'
import { useAuth } from '@providers'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const handleSubmit = async (data: {
    firstName: string
    lastName: string
    email: string
  }) => {
    console.log('Update profile:', data)

    // Connect to API later
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <EditProfile
        initialData={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }}
        onSubmit={handleSubmit}
      />
    </main>
  )
}
