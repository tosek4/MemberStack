import { UserFilters as UserFiltersState } from '../../../types'

export interface UserFiltersProps {
  filters: UserFiltersState
  onChange: (filters: UserFiltersState) => void
  roles: { value: number | string; label: string }[]
}
