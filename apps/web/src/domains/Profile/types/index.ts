export interface EditProfileFormData {
  firstName: string
  lastName: string
  email: string
}

export interface EditProfileProps {
  initialData: EditProfileFormData
  loading?: boolean
  onSubmit?: (data: EditProfileFormData) => void | Promise<void>
}
