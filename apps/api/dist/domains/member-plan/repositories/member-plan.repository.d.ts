import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { MemberPlan, MemberPlanRelations } from '../models';
export declare class MemberPlanRepository extends DefaultCrudRepository<MemberPlan, typeof MemberPlan.prototype.id, MemberPlanRelations> {
    constructor(dataSource: PostgresDataSource);
}
