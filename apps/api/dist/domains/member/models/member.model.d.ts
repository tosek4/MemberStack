import { Entity } from '@loopback/repository';
export declare class Member extends Entity {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthDate: string;
    gender?: string;
    emergency_contact?: string;
    profile_image?: string;
    status?: string;
    [prop: string]: any;
    constructor(data?: Partial<Member>);
}
export interface MemberRelations {
}
export type MemberWithRelations = Member & MemberRelations;
