import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { Attendance } from '../models';
import { Member } from '../../member/models';
import { MemberRepository } from '../../member/repositories';
import { User } from '../../user/models';
import { UserRepository } from '../../user/repositories';
import { AttendanceRelations } from '../types';
export declare class AttendanceRepository extends DefaultCrudRepository<Attendance, typeof Attendance.prototype.id, AttendanceRelations> {
    protected memberRepositoryGetter: Getter<MemberRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly member: BelongsToAccessor<Member, typeof Attendance.prototype.id>;
    readonly createdBy: BelongsToAccessor<User, typeof Attendance.prototype.id>;
    constructor(dataSource: PostgresDataSource, memberRepositoryGetter: Getter<MemberRepository>, userRepositoryGetter: Getter<UserRepository>);
}
