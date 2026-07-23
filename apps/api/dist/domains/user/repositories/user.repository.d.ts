import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { User } from '../models';
import { Role } from '../../role/models';
import { RoleRepository } from '../../role/repositories';
import { RefreshToken } from '../../refresh-token/models';
import { RefreshTokenRepository } from '../../refresh-token/repositories';
import { Member } from '../../member/models';
import { MemberRepository } from '../../member/repositories';
import { Payment } from '../../payment/models';
import { PaymentRepository } from '../../payment/repositories';
import { Attendance } from '../../attendance/models';
import { AttendanceRepository } from '../../attendance/repositories';
import { UserRelations } from '../types';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
    protected roleRepositoryGetter: Getter<RoleRepository>;
    protected refreshTokenRepositoryGetter: Getter<RefreshTokenRepository>;
    protected memberRepositoryGetter: Getter<MemberRepository>;
    protected paymentRepositoryGetter: Getter<PaymentRepository>;
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>;
    readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;
    readonly refreshTokens: HasManyRepositoryFactory<RefreshToken, typeof User.prototype.id>;
    readonly members: HasManyRepositoryFactory<Member, typeof User.prototype.id>;
    readonly payments: HasManyRepositoryFactory<Payment, typeof User.prototype.id>;
    readonly attendances: HasManyRepositoryFactory<Attendance, typeof User.prototype.id>;
    constructor(dataSource: PostgresDataSource, roleRepositoryGetter: Getter<RoleRepository>, refreshTokenRepositoryGetter: Getter<RefreshTokenRepository>, memberRepositoryGetter: Getter<MemberRepository>, paymentRepositoryGetter: Getter<PaymentRepository>, attendanceRepositoryGetter: Getter<AttendanceRepository>);
}
