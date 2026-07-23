import { Entity } from '@loopback/repository';
import { RefreshTokenRelations } from '../types';
export declare class RefreshToken extends Entity {
    id?: number;
    token: string;
    expiresAt: string;
    revokedAt?: string;
    userId: number;
    [prop: string]: any;
    constructor(data?: Partial<RefreshToken>);
}
export type RefreshTokenWithRelations = RefreshToken & RefreshTokenRelations;
