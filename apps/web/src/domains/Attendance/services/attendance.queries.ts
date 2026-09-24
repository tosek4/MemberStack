import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { attendanceService, dailyVisitService } from './attendance.service'
import {
  AttendanceFilters,
  CreateAttendancePayload,
  CreateDailyCheckInPayload,
  UpdateAttendancePayload,
} from '../types'
import { PaymentMethod } from '@/components/PaymentMethodModal'

export const attendanceKeys = {
  all: ['attendances'] as const,

  lists: () => [...attendanceKeys.all, 'list'] as const,

  list: (filters: AttendanceFilters) =>
    [...attendanceKeys.lists(), filters] as const,

  detail: (id: number) => [...attendanceKeys.all, 'detail', id] as const,

  stats: (date: string) => [...attendanceKeys.all, 'stats', date] as const,
}

export const useAttendances = (filters?: AttendanceFilters) => {
  return useQuery({
    queryKey: attendanceKeys.list(filters ?? {}),
    queryFn: () => attendanceService.getAttendances(filters),
    placeholderData: keepPreviousData,
  })
}

export const useAttendance = (id: number) => {
  return useQuery({
    queryKey: attendanceKeys.detail(id),
    queryFn: () => attendanceService.getAttendanceById(id),
    enabled: Number.isFinite(id),
  })
}

export const useAttendanceStats = (date: string) => {
  return useQuery({
    queryKey: attendanceKeys.stats(date),
    queryFn: () => attendanceService.getAttendanceStats(date),
    enabled: Boolean(date),
  })
}

export const useCreateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (attendance: CreateAttendancePayload) =>
      attendanceService.createAttendance(attendance),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.all })
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
    }) => attendanceService.updateAttendance(id, attendance),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.all })
      queryClient.invalidateQueries({
        queryKey: attendanceKeys.detail(variables.id),
      })
    },
  })
}

export const useCreateDailyVisit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data }: { data: CreateDailyCheckInPayload }) =>
      dailyVisitService.createDailyVisit(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.all })
    },
  })
}
