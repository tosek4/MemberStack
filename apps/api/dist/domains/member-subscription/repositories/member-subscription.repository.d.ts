import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { MemberSubscription } from '../models';
import { Member } from '../../member/models';
import { MemberRepository } from '../../member/repositories';
import { MemberPlan } from '../../member-plan/models';
import { MemberPlanRepository } from '../../member-plan/repositories';
import { User } from '../../user/models';
import { UserRepository } from '../../user/repositories';
import { Payment } from '../../payment/models';
import { PaymentRepository } from '../../payment/repositories';
import { MemberSubscriptionRelations } from '../types';
export declare class MemberSubscriptionRepository extends DefaultCrudRepository<MemberSubscription, typeof MemberSubscription.prototype.id, MemberSubscriptionRelations> {
    protected memberRepositoryGetter: Getter<MemberRepository>;
    protected memberPlanRepositoryGetter: Getter<MemberPlanRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    protected paymentRepositoryGetter: Getter<PaymentRepository>;
    readonly member: BelongsToAccessor<Member, typeof MemberSubscription.prototype.id>;
    readonly membershipPlan: BelongsToAccessor<MemberPlan, typeof MemberSubscription.prototype.id>;
    readonly createdBy: BelongsToAccessor<User, typeof MemberSubscription.prototype.id>;
    readonly payments: HasManyRepositoryFactory<Payment, typeof MemberSubscription.prototype.id>;
    constructor(dataSource: PostgresDataSource, memberRepositoryGetter: Getter<MemberRepository>, memberPlanRepositoryGetter: Getter<MemberPlanRepository>, userRepositoryGetter: Getter<UserRepository>, paymentRepositoryGetter: Getter<PaymentRepository>);
}
