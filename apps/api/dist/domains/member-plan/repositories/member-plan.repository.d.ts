import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { MemberPlan } from '../models';
import { MemberSubscription } from '../../member-subscription/models';
import { MemberSubscriptionRepository } from '../../member-subscription/repositories';
import { MemberPlanRelations } from '../types';
export declare class MemberPlanRepository extends DefaultCrudRepository<MemberPlan, typeof MemberPlan.prototype.id, MemberPlanRelations> {
    protected memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>;
    readonly subscriptions: HasManyRepositoryFactory<MemberSubscription, typeof MemberPlan.prototype.id>;
    constructor(dataSource: PostgresDataSource, memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>);
}
