import { Entity } from '@loopback/repository';
import { AttendanceRelations } from '../types';
export declare class Attendance extends Entity {
    id?: number;
    checkedInAt?: string;
    checkedOutAt?: string;
    attendanceMethod: string;
    memberId: number;
    createdByUserId: number;
    constructor(data?: Partial<Attendance>);
}
export type AttendanceWithRelations = Attendance & AttendanceRelations;
