import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: number;
    roleId: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    phone?: string;
    isActive: boolean;
    createdAt: string;
    [prop: string]: any;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
