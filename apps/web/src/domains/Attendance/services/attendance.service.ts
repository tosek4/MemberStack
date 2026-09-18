import { api } from '@/services'
import { Attendance, AttendanceStats, CreateAttendancePayload, UpdateAttendancePayload } from '../types'

export const getAttendances = async (): Promise<Attendance[]> => {
  const response = await api.get<Attendance[]>('/attendances')

  return response.data
}

export const getAttendanceById = async (id: number): Promise<Attendance> => {
  const response = await api.get<Attendance>(`/attendances/${id}`)

  return response.data
}

export const getAttendanceStats = async (
  date: string,
): Promise<AttendanceStats> => {
  const response = await api.get<AttendanceStats>('/attendances/stats', {
    params: {
      date,
    },
  })

  return response.data
}

export const createAttendance = async (
  data: CreateAttendancePayload,
): Promise<Attendance> => {
  const response = await api.post<Attendance>('/attendances', data)

  return response.data
}

export const updateAttendance = async (
  id: number,
  data: UpdateAttendancePayload
): Promise<void> => {
  await api.patch(`/attendances/${id}`, data)
}
