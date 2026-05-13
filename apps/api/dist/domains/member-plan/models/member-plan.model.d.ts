import { Entity } from '@loopback/repository';
export declare class MemberPlan extends Entity {
    id?: number;
    name: string;
    description?: string;
    createdAt: string;
    constructor(data?: Partial<MemberPlan>);
}
export interface MemberPlanRelations {
}
export type MemberPlanWithRelations = MemberPlan & MemberPlanRelations;
