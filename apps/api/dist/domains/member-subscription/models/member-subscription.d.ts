import { Entity } from '@loopback/repository';
export declare class MemberSubscription extends Entity {
    id?: number;
    memberId: string;
    membershipPlanId: string;
    startedAt: string;
    expiresAt: string;
    status?: string;
    remainingVisits: number;
    createdByUserId: string;
    constructor(data?: Partial<MemberSubscription>);
}
export interface MemberSubscriptionRelations {
}
export type MemberSubscriptionWithRelations = MemberSubscription & MemberSubscriptionRelations;
