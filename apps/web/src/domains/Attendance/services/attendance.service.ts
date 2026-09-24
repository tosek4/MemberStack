import { api } from '@/services'
import {
  Attendance,
  AttendanceFilters,
  AttendanceStats,
  CreateAttendancePayload,
  CreateDailyCheckInPayload,
  UpdateAttendancePayload,
} from '../types'
import { PaymentMethod } from '@/components/PaymentMethodModal'

export const attendanceService = {
  getAttendances: async (
    filters?: AttendanceFilters,
  ): Promise<Attendance[]> => {
    const params = new URLSearchParams()

    if (filters?.search?.trim()) {
      params.set('search', filters.search.trim())
    }

    if (filters?.status && filters.status !== 'all') {
      params.set('status', filters.status)
    }

    if (filters?.date?.trim()) {
      params.set('date', filters.date.trim())
    }

    const query = params.toString()

    const response = await api.get<Attendance[]>(
      `/attendances${query ? `?${query}` : ''}`,
    )

    return response.data
  },

  getAttendanceById: async (id: number): Promise<Attendance> => {
    const response = await api.get<Attendance>(`/attendances/${id}`)

    return response.data
  },
  getAttendanceStats: async (date: string): Promise<AttendanceStats> => {
    const response = await api.get<AttendanceStats>('/attendances/stats', {
      params: {
        date,
      },
    })

    return response.data
  },

  createAttendance: async (
    data: CreateAttendancePayload,
  ): Promise<Attendance> => {
    const response = await api.post<Attendance>('/attendances', data)

    return response.data
  },
  updateAttendance: async (
    id: number,
    data: UpdateAttendancePayload,
  ): Promise<void> => {
    await api.patch(`/attendances/${id}`, data)
  },
}

export const dailyVisitService = {
  createDailyVisit: async (
    data: CreateDailyCheckInPayload,
  ): Promise<Attendance> => {
    const response = await api.post<Attendance>('/daily-visits', data)

    return response.data
  },
}
