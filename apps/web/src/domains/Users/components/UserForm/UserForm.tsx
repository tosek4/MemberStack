import React, { useEffect, useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { UserFormData, UserFormProps } from './types'
import { styles } from './UserForm.styled'
import { LABELS } from '../../utils/labels'
import { useCreateUser, useRoles, useUpdateUser, useUser } from '../../services'

export const UserForm: React.FC<UserFormProps> = ({ userId }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const isEdit = userId !== undefined

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUser(userId as number)

  const {
    data: roles = [],
    isLoading: rolesLoading,
    isError: rolesError,
  } = useRoles()
  console.log('roles', roles)
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: undefined,
      isActive: true,
      password: '',
    },
  })

  useEffect(() => {
    if (!user || !isEdit) {
      return
    }

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? '',
      roleId: user.roleId,
      isActive: user.isActive,
      password: '',
    })
  }, [user, isEdit, reset])

  const isLoading =
    rolesLoading || userLoading || createUser.isPending || updateUser.isPending

  const handleFormSubmit = async (data: UserFormData) => {
    if (isEdit && userId !== undefined) {
      await updateUser.mutateAsync({
        id: userId,
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          roleId: Number(data.roleId),
          isActive: data.isActive,
        },
      })
    } else {
      await createUser.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        roleId: Number(data.roleId),
        isActive: data.isActive,
        password: data.password as string,
      })
    }

    router.push('/users')
  }

  if (isEdit && userLoading) {
    return (
      <div className={styles.container}>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading user...
        </p>
      </div>
    )
  }

  if (isEdit && userError) {
    return (
      <div className={styles.container}>
        <p className="text-sm text-red-600">Failed to load user.</p>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push('/users')}
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>
            {isEdit ? 'Edit User' : 'Add User'}
          </h1>

          <p className={styles.pageDescription}>
            {isEdit
              ? 'Update the user information and account settings.'
              : 'Create a new user account for your staff.'}
          </p>
        </div>

        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push('/users')}
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
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
              disabled={isLoading || rolesError}
              {...register('roleId', {
                required: 'Role is required',
                valueAsNumber: true,
              })}
            >
              <option value="" disabled>
                {rolesLoading ? 'Loading roles...' : 'Select role'}
              </option>

              {roles.map((role) => (
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
              disabled={isLoading}
              {...register('isActive', {
                required: 'Status is required',
                setValueAs: (value) => value === 'true',
              })}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            {errors.isActive && (
              <p className="text-sm text-red-600">{errors.isActive.message}</p>
            )}
          </div>
        </div>

        {!isEdit && (
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
        )}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading
            ? isEdit
              ? 'Saving...'
              : 'Creating...'
            : isEdit
              ? 'Save Changes'
              : LABELS.addUser}
        </button>
      </form>
    </div>
  )
}
