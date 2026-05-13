import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { Member, MemberRelations } from '../models';
export declare class MemberRepository extends DefaultCrudRepository<Member, typeof Member.prototype.id, MemberRelations> {
    constructor(dataSource: PostgresDataSource);
}
