"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberSubscriptionRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../../../datasources");
const models_1 = require("../models");
let MemberSubscriptionRepository = class MemberSubscriptionRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.MemberSubscription, dataSource);
    }
};
exports.MemberSubscriptionRepository = MemberSubscriptionRepository;
exports.MemberSubscriptionRepository = MemberSubscriptionRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.postgres')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.PostgresDataSource])
], MemberSubscriptionRepository);
//# sourceMappingURL=member-subscription.repository.js.map