import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { MemberSubscription, MemberSubscriptionRelations } from '../models';
export declare class MemberSubscriptionRepository extends DefaultCrudRepository<MemberSubscription, typeof MemberSubscription.prototype.id, MemberSubscriptionRelations> {
    constructor(dataSource: PostgresDataSource);
}
