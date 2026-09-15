import React from 'react'
import { useRouter } from 'next/router'

import { AddUser } from '@domain/Users/components'
import { styles } from '@domain/Users/Users.styled'

export default function NewUserPage() {
  const router = useRouter()

  return (
    <main className={styles.root}>
      <div className={styles.header.wrapper}>
        <div>
          <h1 className={styles.header.title}>Add Staff Member</h1>

          <p className={styles.header.subtitle}>
            Create a new account for a gym employee.
          </p>
        </div>

        <button
          type="button"
          className={styles.header.button}
          onClick={() => router.push('/users')}
        >
          Back to Staff
        </button>
      </div>

      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <AddUser />
      </div>
    </main>
  )
}
