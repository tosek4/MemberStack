"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberPlanRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../../../datasources");
const models_1 = require("../models");
let MemberPlanRepository = class MemberPlanRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, memberSubscriptionRepositoryGetter) {
        super(models_1.MemberPlan, dataSource);
        this.memberSubscriptionRepositoryGetter = memberSubscriptionRepositoryGetter;
        this.subscriptions = this.createHasManyRepositoryFactoryFor('subscriptions', memberSubscriptionRepositoryGetter);
        this.registerInclusionResolver('subscriptions', this.subscriptions.inclusionResolver);
    }
};
exports.MemberPlanRepository = MemberPlanRepository;
exports.MemberPlanRepository = MemberPlanRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.postgres')),
    tslib_1.__param(1, repository_1.repository.getter('MemberSubscriptionRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.PostgresDataSource, Function])
], MemberPlanRepository);
//# sourceMappingURL=member-plan.repository.js.map