import { service } from '@loopback/core'
import { Count, CountSchema, Filter, Where } from '@loopback/repository'
import {
  api,
  del,
  get,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { Attendance } from '../models'
import { AttendanceService } from '../service'
import {
  AttendanceCountResponseSchema,
  AttendanceDeleteResponseSchema,
  AttendanceGetByIdResponseSchema,
  AttendanceResponseSchema,
  AttendanceStatsResponseSchema,
  AttendanceUpdateResponseSchema,
  CreateAttendanceRequestSchema,
  CreateAttendanceResponseSchema,
  UpdateAttendanceRequestSchema,
} from './attendance.docs'
import {
  AttendanceListItem,
  AttendanceListStatus,
  AttendanceStats,
} from '../types'
import { authenticate } from '@loopback/authentication'

@authenticate('jwt')
@api({ basePath: '/attendances' })
export class AttendanceController {
  constructor(
    @service(AttendanceService)
    private attendanceService: AttendanceService,
  ) {}

  @get('/')
  @response(200, AttendanceResponseSchema)
  find(
    @param.query.string('search') search?: string,
    @param.query.string('status') status?: string,
    @param.query.string('date') date?: string,
  ): Promise<AttendanceListItem[]> {
    return this.attendanceService.find({
      search,
      status: status as AttendanceListStatus | undefined,
      date,
    })
  }

  @get('/stats')
  @response(200, AttendanceStatsResponseSchema)
  async getStats(
    @param.query.string('date') date: string,
  ): Promise<AttendanceStats> {
    return this.attendanceService.getStats(date)
  }

  @post('/')
  @response(200, CreateAttendanceResponseSchema)
  create(
    @requestBody(CreateAttendanceRequestSchema)
    attendance: Omit<Attendance, 'id'>,
  ): Promise<Attendance> {
    return this.attendanceService.create(attendance)
  }

  @get('/count')
  @response(200, AttendanceCountResponseSchema)
  count(@param.where(Attendance) where?: Where<Attendance>): Promise<Count> {
    return this.attendanceService.count(where)
  }

  @get('/{id}')
  @response(200, AttendanceGetByIdResponseSchema)
  findById(@param.path.number('id') id: number): Promise<Attendance> {
    return this.attendanceService.findById(id)
  }

  @patch('/{id}')
  @response(204, AttendanceUpdateResponseSchema)
  async updateById(
    @param.path.number('id') id: number,
    @requestBody(UpdateAttendanceRequestSchema)
    attendance: Partial<Attendance>,
  ): Promise<void> {
    await this.attendanceService.updateById(id, attendance)
  }

  @del('/{id}')
  @response(204, AttendanceDeleteResponseSchema)
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.attendanceService.deleteById(id)
  }
}
