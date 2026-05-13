import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { Attendance, AttendanceRelations } from '../models'

export class AttendanceRepository extends DefaultCrudRepository<
  Attendance,
  typeof Attendance.prototype.id,
  AttendanceRelations
> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(Attendance, dataSource)
  }
}
