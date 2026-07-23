import { Entity } from '@loopback/repository';
import { User } from '../../user/models';
import { RoleRelations } from '../types';
export declare class Role extends Entity {
    id?: number;
    name: string;
    description?: string;
    createdAt: string;
    users?: User[];
    constructor(data?: Partial<Role>);
}
export type RoleWithRelations = Role & RoleRelations;
