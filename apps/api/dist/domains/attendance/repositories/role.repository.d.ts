import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { Attendance, AttendanceRelations } from '../models';
export declare class AttendanceRepository extends DefaultCrudRepository<Attendance, typeof Attendance.prototype.id, AttendanceRelations> {
    constructor(dataSource: PostgresDataSource);
}
