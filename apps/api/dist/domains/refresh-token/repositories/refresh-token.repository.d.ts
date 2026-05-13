import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../../../datasources';
import { RefreshToken, RefreshTokenRelations } from '../models';
export declare class RefreshTokenRepository extends DefaultCrudRepository<RefreshToken, typeof RefreshToken.prototype.id, RefreshTokenRelations> {
    constructor(dataSource: PostgresDataSource);
}
