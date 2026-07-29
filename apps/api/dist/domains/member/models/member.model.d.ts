import { Entity } from '@loopback/repository';
import { Attendance } from '../../attendance/models';
import { Payment } from '../../payment/models';
import { MemberSubscription } from '../../member-subscription/models';
import { MemberRelations } from '../types';
import { MemberStatus } from '../types/member-status';
export declare class Member extends Entity {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthDate: Date;
    gender?: string;
    emergency_contact?: string;
    profile_image?: string;
    status: MemberStatus;
    createdByUserId: number;
    attendances?: Attendance[];
    payments?: Payment[];
    subscriptions?: MemberSubscription[];
    [prop: string]: any;
    constructor(data?: Partial<Member>);
}
export type MemberWithRelations = Member & MemberRelations;
