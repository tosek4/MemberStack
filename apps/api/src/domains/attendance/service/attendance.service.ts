import { BindingScope, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { Attendance } from '../models'
import { AttendanceRepository } from '../repositories'

@injectable({ scope: BindingScope.TRANSIENT })
export class AttendanceService {
  constructor(
    @repository(AttendanceRepository)
    private attendanceRepository: AttendanceRepository,
  ) {}

  create(data: Omit<Attendance, 'id'>): Promise<Attendance> {
    return this.attendanceRepository.create(data)
  }

  find(filter?: Filter<Attendance>): Promise<Attendance[]> {
    return this.attendanceRepository.find(filter)
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<Attendance>,
  ): Promise<Attendance> {
    try {
      return await this.attendanceRepository.findById(id, filter)
    } catch {
      throw new HttpErrors.NotFound(`Attendance ${id} not found`)
    }
  }

  count(where?: Where<Attendance>): Promise<Count> {
    return this.attendanceRepository.count(where)
  }

  async updateById(id: number, data: Partial<Attendance>): Promise<void> {
    await this.findById(id)
    await this.attendanceRepository.updateById(id, data)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.attendanceRepository.deleteById(id)
  }
}
