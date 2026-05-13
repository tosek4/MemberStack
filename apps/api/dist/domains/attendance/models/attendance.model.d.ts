import { Entity } from '@loopback/repository';
export declare class Attendance extends Entity {
    id?: number;
    memberId: string;
    checkedInAt?: string;
    checkedOutAt?: string;
    attendanceMethod: string;
    createdByUserId?: string;
    constructor(data?: Partial<Attendance>);
}
export interface AttendanceRelations {
}
export type AttendanceWithRelations = Attendance & AttendanceRelations;
