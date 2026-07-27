import { service } from '@loopback/core'
import { Count, CountSchema, Filter, Where } from '@loopback/repository'
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { Attendance } from '../models'
import { AttendanceService } from '../service'

export class AttendanceController {
  constructor(
    @service(AttendanceService)
    private attendanceService: AttendanceService,
  ) {}

  @post('/attendances')
  @response(200, {
    description: 'Attendance model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Attendance) } },
  })
  create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {
            title: 'NewAttendance',
            exclude: ['id'],
          }),
        },
      },
    })
    attendance: Omit<Attendance, 'id'>,
  ): Promise<Attendance> {
    return this.attendanceService.create(attendance)
  }

  @get('/attendances/count')
  @response(200, {
    description: 'Attendance model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  count(@param.where(Attendance) where?: Where<Attendance>): Promise<Count> {
    return this.attendanceService.count(where)
  }

  @get('/attendances')
  @response(200, {
    description: 'Array of Attendance model instances',
    content: {
      'application/json': {
        schema: { type: 'array', items: getModelSchemaRef(Attendance) },
      },
    },
  })
  find(
    @param.filter(Attendance) filter?: Filter<Attendance>,
  ): Promise<Attendance[]> {
    return this.attendanceService.find(filter)
  }

  @get('/attendances/{id}')
  @response(200, {
    description: 'Attendance model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Attendance) } },
  })
  findById(@param.path.number('id') id: number): Promise<Attendance> {
    return this.attendanceService.findById(id)
  }

  @patch('/attendances/{id}')
  @response(204, { description: 'Attendance PATCH success' })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, { partial: true }),
        },
      },
    })
    attendance: Partial<Attendance>,
  ): Promise<void> {
    await this.attendanceService.updateById(id, attendance)
  }

  @del('/attendances/{id}')
  @response(204, { description: 'Attendance DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.attendanceService.deleteById(id)
  }
}
