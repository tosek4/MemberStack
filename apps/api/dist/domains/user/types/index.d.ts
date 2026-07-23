import { AttendanceWithRelations } from "../../attendance/models";
import { MemberWithRelations } from "../../member/models";
import { PaymentWithRelations } from "../../payment/models";
import { RefreshTokenWithRelations } from "../../refresh-token/models";
import { RoleWithRelations } from "../../role/models";
export interface UserRelations {
    role?: RoleWithRelations;
    refreshTokens?: RefreshTokenWithRelations[];
    members?: MemberWithRelations[];
    payments?: PaymentWithRelations[];
    attendances?: AttendanceWithRelations[];
}
