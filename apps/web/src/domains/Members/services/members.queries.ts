import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CreateMemberPayload, UpdateMemberData } from '../types'

import { membersService } from './members.service'

export const memberKeys = {
  all: ['members'] as const,

  lists: () => [...memberKeys.all, 'list'] as const,

  detail: (id: number) => [...memberKeys.all, 'detail', id] as const,
}

export const useMembers = () => {
  return useQuery({
    queryKey: memberKeys.lists(),
    queryFn: membersService.getAll,
  })
}

export const useMember = (id: number) => {
  return useQuery({
    queryKey: memberKeys.detail(id),
    queryFn: () => membersService.getById(id),
    enabled: Boolean(id),
  })
}

export const useCreateMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMemberPayload) => membersService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberKeys.all,
      })
    },
  })
}

export const useUpdateMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMemberData }) =>
      membersService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: memberKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: memberKeys.detail(variables.id),
      })
    },
  })
}

export const useDeleteMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: membersService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberKeys.lists(),
      })
    },
  })
}
