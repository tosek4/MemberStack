"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberSubscriptionRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../../../datasources");
const models_1 = require("../models");
let MemberSubscriptionRepository = class MemberSubscriptionRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, memberRepositoryGetter, memberPlanRepositoryGetter, userRepositoryGetter, paymentRepositoryGetter) {
        super(models_1.MemberSubscription, dataSource);
        this.memberRepositoryGetter = memberRepositoryGetter;
        this.memberPlanRepositoryGetter = memberPlanRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.paymentRepositoryGetter = paymentRepositoryGetter;
        this.member = this.createBelongsToAccessorFor('member', memberRepositoryGetter);
        this.registerInclusionResolver('member', this.member.inclusionResolver);
        this.membershipPlan = this.createBelongsToAccessorFor('membershipPlan', memberPlanRepositoryGetter);
        this.registerInclusionResolver('membershipPlan', this.membershipPlan.inclusionResolver);
        this.createdBy = this.createBelongsToAccessorFor('createdBy', userRepositoryGetter);
        this.registerInclusionResolver('createdBy', this.createdBy.inclusionResolver);
        this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter);
        this.registerInclusionResolver('payments', this.payments.inclusionResolver);
    }
};
exports.MemberSubscriptionRepository = MemberSubscriptionRepository;
exports.MemberSubscriptionRepository = MemberSubscriptionRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.postgres')),
    tslib_1.__param(1, repository_1.repository.getter('MemberRepository')),
    tslib_1.__param(2, repository_1.repository.getter('MemberPlanRepository')),
    tslib_1.__param(3, repository_1.repository.getter('UserRepository')),
    tslib_1.__param(4, repository_1.repository.getter('PaymentRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.PostgresDataSource, Function, Function, Function, Function])
], MemberSubscriptionRepository);
//# sourceMappingURL=member-subscription.repository.js.map