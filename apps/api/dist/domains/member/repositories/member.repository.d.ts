import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { Member } from '../models';
import { User } from '../../user/models';
import { UserRepository } from '../../user/repositories';
import { Attendance } from '../../attendance/models';
import { AttendanceRepository } from '../../attendance/repositories';
import { Payment } from '../../payment/models';
import { PaymentRepository } from '../../payment/repositories';
import { MemberSubscription } from '../../member-subscription/models';
import { MemberSubscriptionRepository } from '../../member-subscription/repositories';
import { MemberRelations } from '../types';
export declare class MemberRepository extends DefaultCrudRepository<Member, typeof Member.prototype.id, MemberRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>;
    protected paymentRepositoryGetter: Getter<PaymentRepository>;
    protected memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>;
    readonly createdBy: BelongsToAccessor<User, typeof Member.prototype.id>;
    readonly attendances: HasManyRepositoryFactory<Attendance, typeof Member.prototype.id>;
    readonly payments: HasManyRepositoryFactory<Payment, typeof Member.prototype.id>;
    readonly subscriptions: HasManyRepositoryFactory<MemberSubscription, typeof Member.prototype.id>;
    constructor(dataSource: PostgresDataSource, userRepositoryGetter: Getter<UserRepository>, attendanceRepositoryGetter: Getter<AttendanceRepository>, paymentRepositoryGetter: Getter<PaymentRepository>, memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>);
}
