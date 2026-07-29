import { Entity } from '@loopback/repository';
import { RefreshToken } from '../../refresh-token/models';
import { Member } from '../../member/models';
import { Payment } from '../../payment/models';
import { Attendance } from '../../attendance/models';
import { UserRelations } from '../types';
export declare class User extends Entity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    phone?: string;
    isActive: boolean;
    createdAt?: Date;
    deviceToken: string;
    pin: string;
    pinValid: string;
    roleId: number;
    refreshTokens?: RefreshToken[];
    members?: Member[];
    payments?: Payment[];
    attendances?: Attendance[];
    [prop: string]: any;
    constructor(data?: Partial<User>);
}
export type UserWithRelations = User & UserRelations;
