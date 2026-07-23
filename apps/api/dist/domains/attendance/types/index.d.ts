import { MemberWithRelations } from '../../member/models';
import { UserWithRelations } from '../../user/models';
export interface AttendanceRelations {
    member?: MemberWithRelations;
    createdBy?: UserWithRelations;
}
