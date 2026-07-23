import { MemberSubscriptionWithRelations } from '../../member-subscription/models';
import { MemberWithRelations } from '../../member/models';
import { UserWithRelations } from '../../user/models';
export interface PaymentRelations {
    member?: MemberWithRelations;
    memberSubscription?: MemberSubscriptionWithRelations;
    createdBy?: UserWithRelations;
}
