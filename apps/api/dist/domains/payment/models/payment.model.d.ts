import { Entity } from '@loopback/repository';
import { PaymentRelations } from '../types';
export declare class Payment extends Entity {
    id?: number;
    amount?: number;
    paymentMethod: string;
    paidAt?: Date;
    transactionReference?: string;
    memberId: number;
    memberSubscriptionId: number;
    createdByUserId: number;
    constructor(data?: Partial<Payment>);
}
export type PaymentWithRelations = Payment & PaymentRelations;
