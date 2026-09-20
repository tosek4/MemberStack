import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { userService } from './users.service'
import { CreateUserPayload, UpdateUserPayload, UserFilters } from '../types'

export const UserKeys = {
  all: ['users'] as const,

  lists: () => [...UserKeys.all, 'list'] as const,

  list: (filters: UserFilters) => [...UserKeys.lists(), filters] as const,

  detail: (id: number) => [...UserKeys.all, 'detail', id] as const,
}

export const useUsers = (filters?: UserFilters) => {
  return useQuery({
    queryKey: UserKeys.list(filters ?? {}),
    queryFn: () => userService.getUsers(filters),
    placeholderData: keepPreviousData,
  })
}

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUsersById(id),
    enabled: Number.isFinite(id),
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserPayload) => userService.createUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UserKeys.lists(),
      })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserPayload }) =>
      userService.updateUser(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: UserKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: ['user', variables.id],
      })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: UserKeys.lists(),
      })
    },
  })
}

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: userService.getRoles,
  })
}
