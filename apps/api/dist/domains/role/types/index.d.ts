import { UserWithRelations } from '../../user/models';
export interface RoleRelations {
    users?: UserWithRelations[];
}
