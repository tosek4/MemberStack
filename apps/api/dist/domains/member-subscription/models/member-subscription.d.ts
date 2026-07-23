import { Entity } from '@loopback/repository';
import { Payment } from '../../payment/models';
import { MemberSubscriptionRelations } from '../types';
export declare class MemberSubscription extends Entity {
    id?: number;
    startedAt: string;
    expiresAt: string;
    status?: string;
    remainingVisits: number;
    memberId: number;
    membershipPlanId: number;
    createdByUserId: number;
    payments?: Payment[];
    constructor(data?: Partial<MemberSubscription>);
}
export type MemberSubscriptionWithRelations = MemberSubscription & MemberSubscriptionRelations;
