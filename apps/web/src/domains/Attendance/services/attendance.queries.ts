import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createAttendance,
  getAttendanceById,
  getAttendanceStats,
  getAttendances,
  updateAttendance,
} from './attendance.service'
import {
  CreateAttendancePayload,
  UpdateAttendancePayload,
} from '../types'

export const useAttendances = () => {
  return useQuery({
    queryKey: ['attendances'],
    queryFn: getAttendances,
  })
}

export const useAttendance = (id: number) => {
  return useQuery({
    queryKey: ['attendance', id],
    queryFn: () => getAttendanceById(id),
    enabled: Number.isFinite(id),
  })
}

export const useAttendanceStats = (date: string) => {
  return useQuery({
    queryKey: ['attendance-stats', date],
    queryFn: () => getAttendanceStats(date),
    enabled: Boolean(date),
  })
}

export const useCreateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (attendance: CreateAttendancePayload) =>
      createAttendance(attendance),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
    },
  })
}

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      attendance,
    }: {
      id: number
      attendance: UpdateAttendancePayload
    }) => updateAttendance(id, attendance),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['attendances'] })
      queryClient.invalidateQueries({ queryKey: ['attendance', variables.id] })
    },
  })
}
