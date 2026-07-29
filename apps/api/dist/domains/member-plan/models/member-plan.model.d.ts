import { Entity } from '@loopback/repository';
import { MemberSubscription } from '../../member-subscription/models';
import { MemberPlanRelations } from '../types';
export declare class MemberPlan extends Entity {
    id?: number;
    name: string;
    description?: string;
    createdAt: Date;
    subscriptions?: MemberSubscription[];
    constructor(data?: Partial<MemberPlan>);
}
export type MemberPlanWithRelations = MemberPlan & MemberPlanRelations;
