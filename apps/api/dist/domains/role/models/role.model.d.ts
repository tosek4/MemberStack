import { Entity } from '@loopback/repository';
export declare class Role extends Entity {
    id?: number;
    name: string;
    description?: string;
    createdAt: string;
    constructor(data?: Partial<Role>);
}
export interface RoleRelations {
}
export type RoleWithRelations = Role & RoleRelations;
