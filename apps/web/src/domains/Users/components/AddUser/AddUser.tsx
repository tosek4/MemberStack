import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { AddUserFormData } from './types'
import { styles } from './AddUser.styled'
import { LABELS } from '../../utils/labels'
import { useCreateUser, useRoles } from '../../services'

export const AddUser: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormData>()

  const {
    data: roles = [],
    isLoading: rolesLoading,
    isError: rolesError,
  } = useRoles()

  const staffRoles = roles.filter(
    (role) => role.name !== 'admin' && role.name !== 'superAdmin',
  )
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser()

  const onSubmit = async (data: AddUserFormData) => {
    const formData: AddUserFormData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      roleId: Number(data.roleId),
      status: data.status,
      password: data.password,
    }

    try {
      await createUser(formData)
    } catch (error) {
      console.error('Failed to create staff member:', error)
    }
  }

  const isLoading = rolesLoading || isCreating

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <div className="w-full">
          <label className={styles.label}>First Name</label>

          <input
            type="text"
            className={styles.input}
            disabled={isLoading}
            {...register('firstName', {
              required: 'First name is required',
            })}
          />

          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className={styles.label}>Last Name</label>

          <input
            type="text"
            className={styles.input}
            disabled={isLoading}
            {...register('lastName', {
              required: 'Last name is required',
            })}
          />

          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>

        <input
          type="email"
          className={styles.input}
          disabled={isLoading}
          {...register('email', {
            required: 'Email is required',
          })}
        />

        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Phone</label>

        <input
          type="tel"
          className={styles.input}
          disabled={isLoading}
          {...register('phone')}
        />
      </div>

      <div className={styles.title}>
        <div className="w-full">
          <label className={styles.label}>Role</label>

          <select
            className={styles.select}
            defaultValue=""
            disabled={isLoading || rolesError}
            {...register('roleId', {
              required: 'Role is required',
            })}
          >
            <option value="" disabled>
              {rolesLoading ? 'Loading roles...' : 'Select role'}
            </option>

            {staffRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          {rolesError && (
            <p className="text-sm text-red-600">Failed to load roles.</p>
          )}

          {errors.roleId && (
            <p className="text-sm text-red-600">{errors.roleId.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className={styles.label}>Status</label>

          <select
            className={styles.select}
            defaultValue="true"
            disabled={isLoading}
            {...register('status', {
              required: 'Status is required',
            })}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {errors.status && (
            <p className="text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Password</label>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className={`${styles.input} pr-10`}
            disabled={isLoading}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must contain at least 8 characters',
              },
            })}
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-gray-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}>
        {isCreating ? 'Creating...' : LABELS.addUser}
      </button>
    </form>
  )
}
