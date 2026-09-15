import React from 'react'
import { useForm } from 'react-hook-form'

import { UserRole } from '../../types'
import { AddUserFormData } from './types'
import { styles } from './AddUser.styled'
import { LABELS } from '../../utils/labels'

export const AddUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormData>()

  const onSubmit = (data: AddUserFormData) => {
    console.log('Create staff member:', data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label}>Name</label>

        <input
          type="text"
          className={styles.input}
          {...register('name', {
            required: 'Name is required',
          })}
        />

        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>

        <input
          type="email"
          className={styles.input}
          {...register('email', {
            required: 'Email is required',
          })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Phone</label>

        <input type="tel" className={styles.input} {...register('phone')} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Role</label>

        <select
          className={styles.select}
          defaultValue=""
          {...register('role', {
            required: 'Role is required',
          })}
        >
          <option value="" disabled>
            Select role
          </option>

          {Object.entries(LABELS.roles).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Password</label>

        <input
          type="password"
          className={styles.input}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must contain at least 8 characters',
            },
          })}
        />
      </div>

      <button type="submit" className={styles.button}>
        {LABELS.addUser}
      </button>
    </form>
  )
}
