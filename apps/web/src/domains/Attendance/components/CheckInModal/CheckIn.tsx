import React, { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMembers } from '@/domains/Members/services'
import type { CheckInFormData, CheckInProps } from '../../types'
import { styles } from './CheckIn.styled'

export const CheckIn: React.FC<CheckInProps> = ({
  open,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [search, setSearch] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CheckInFormData>()

  const {
    data: members = [],
    isLoading: membersLoading,
    isError: membersError,
  } = useMembers()

  const selectedMemberId = watch('memberId')

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    return members.filter((member) => {
      if (!member.activeSubscription) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase()

      return (
        fullName.includes(normalizedSearch) ||
        member.email.toLowerCase().includes(normalizedSearch) ||
        member.phone?.includes(normalizedSearch)
      )
    })
  }, [members, search])

  const selectedMember = members.find(
    (member) => member.id === selectedMemberId,
  )

  const selectedSubscription = selectedMember?.activeSubscription

  if (!open) {
    return null
  }

  const isLoading = loading || membersLoading

  const handleClose = () => {
    if (loading) {
      return
    }

    reset()
    setSearch('')
    onClose()
  }

  const handleMemberChange = (memberId: number) => {
    setValue('memberId', memberId, {
      shouldValidate: true,
    })
  }

  const submit = async (data: CheckInFormData) => {
    await onSubmit(data)
  }

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="check-in-title"
      >
        <div className={styles.header}>
          <div>
            <h2 id="check-in-title" className={styles.title}>
              Check In Member
            </h2>

            <p className={styles.description}>
              Record a member visit to the gym.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            disabled={loading}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          {membersError && (
            <p className={styles.error}>Failed to load members.</p>
          )}

          <div className={styles.field}>
            <label htmlFor="check-in-member-search" className={styles.label}>
              Member
            </label>

            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />

              <input
                id="check-in-member-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email or phone..."
                className={styles.searchInput}
                disabled={isLoading || membersError}
              />
            </div>

            <div className={styles.memberList}>
              {filteredMembers.length === 0 && !membersLoading && (
                <div className={styles.emptyState}>
                  No active members found.
                </div>
              )}

              {filteredMembers.map((member) => {
                const isSelected = member.id === selectedMemberId

                return (
                  <button
                    key={member.id}
                    type="button"
                    className={`${styles.memberOption} ${
                      isSelected ? styles.memberOptionSelected : ''
                    }`}
                    onClick={() => handleMemberChange(member.id)}
                    disabled={isLoading}
                  >
                    <div className={styles.memberInfo}>
                      <span className={styles.memberName}>
                        {member.firstName} {member.lastName}
                      </span>

                      <span className={styles.memberEmail}>{member.email}</span>
                    </div>

                    <span className={styles.memberPlan}>
                      {member?.activeSubscription?.membershipPlan?.name}
                    </span>
                  </button>
                )
              })}
            </div>

            <input
              type="hidden"
              {...register('memberId', {
                required: 'Member is required',
                valueAsNumber: true,
              })}
            />

            {errors.memberId && (
              <span className={styles.error}>{errors.memberId.message}</span>
            )}
          </div>

          {selectedMember && selectedSubscription && (
            <div className={styles.subscription}>
              <div className={styles.subscriptionHeader}>
                <span className={styles.subscriptionTitle}>
                  Active Subscription
                </span>
              </div>

              <div className={styles.subscriptionDetails}>
                <div>
                  <span className={styles.subscriptionLabel}>Plan</span>

                  <span className={styles.subscriptionValue}>
                    {selectedSubscription?.membershipPlan?.name}
                  </span>
                </div>

                <div>
                  <span className={styles.subscriptionLabel}>Valid until</span>

                  <span className={styles.subscriptionValue}>
                    {new Date(
                      selectedSubscription.expiresAt,
                    ).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>

              <input type="hidden" />
            </div>
          )}

          {selectedMember && !selectedSubscription && (
            <p className={styles.error}>
              This member does not have an active subscription.
            </p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.button}
              disabled={isLoading || !selectedMember || !selectedSubscription}
            >
              {loading ? 'Checking In...' : 'Check In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
