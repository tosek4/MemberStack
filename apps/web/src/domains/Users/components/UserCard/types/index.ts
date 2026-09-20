import { User } from "@/domains/Users/types"

export interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
  onToggleStatus?: (user: { id: number; status: boolean }) => void
}
