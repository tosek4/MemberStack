import { Entity } from '@loopback/repository';
export declare class Payment extends Entity {
    id?: number;
    memberSubscriptionId: string;
    amount?: number;
    paymentMethod: string;
    paidAt?: string;
    transactionReference?: string;
    createdByUserId?: string;
    constructor(data?: Partial<Payment>);
}
export interface PaymentRelations {
}
export type PaymentWithRelations = Payment & PaymentRelations;
