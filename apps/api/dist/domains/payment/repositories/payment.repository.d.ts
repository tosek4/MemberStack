import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { Payment } from '../models';
import { Member } from '../../member/models';
import { MemberRepository } from '../../member/repositories';
import { MemberSubscription } from '../../member-subscription/models';
import { MemberSubscriptionRepository } from '../../member-subscription/repositories';
import { User } from '../../user/models';
import { UserRepository } from '../../user/repositories';
import { PaymentRelations } from '../types';
export declare class PaymentRepository extends DefaultCrudRepository<Payment, typeof Payment.prototype.id, PaymentRelations> {
    protected memberRepositoryGetter: Getter<MemberRepository>;
    protected memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly member: BelongsToAccessor<Member, typeof Payment.prototype.id>;
    readonly memberSubscription: BelongsToAccessor<MemberSubscription, typeof Payment.prototype.id>;
    readonly createdBy: BelongsToAccessor<User, typeof Payment.prototype.id>;
    constructor(dataSource: PostgresDataSource, memberRepositoryGetter: Getter<MemberRepository>, memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>, userRepositoryGetter: Getter<UserRepository>);
}
