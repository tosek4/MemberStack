import { UserWithRelations } from '../../user/models';
export interface RefreshTokenRelations {
    user?: UserWithRelations;
}
