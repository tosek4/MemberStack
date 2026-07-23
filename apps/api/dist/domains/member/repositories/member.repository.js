"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../../../datasources");
const models_1 = require("../models");
let MemberRepository = class MemberRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, userRepositoryGetter, attendanceRepositoryGetter, paymentRepositoryGetter, memberSubscriptionRepositoryGetter) {
        super(models_1.Member, dataSource);
        this.userRepositoryGetter = userRepositoryGetter;
        this.attendanceRepositoryGetter = attendanceRepositoryGetter;
        this.paymentRepositoryGetter = paymentRepositoryGetter;
        this.memberSubscriptionRepositoryGetter = memberSubscriptionRepositoryGetter;
        this.createdBy = this.createBelongsToAccessorFor('createdBy', userRepositoryGetter);
        this.registerInclusionResolver('createdBy', this.createdBy.inclusionResolver);
        this.attendances = this.createHasManyRepositoryFactoryFor('attendances', attendanceRepositoryGetter);
        this.registerInclusionResolver('attendances', this.attendances.inclusionResolver);
        this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter);
        this.registerInclusionResolver('payments', this.payments.inclusionResolver);
        this.subscriptions = this.createHasManyRepositoryFactoryFor('subscriptions', memberSubscriptionRepositoryGetter);
        this.registerInclusionResolver('subscriptions', this.subscriptions.inclusionResolver);
    }
};
exports.MemberRepository = MemberRepository;
exports.MemberRepository = MemberRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.postgres')),
    tslib_1.__param(1, repository_1.repository.getter('UserRepository')),
    tslib_1.__param(2, repository_1.repository.getter('AttendanceRepository')),
    tslib_1.__param(3, repository_1.repository.getter('PaymentRepository')),
    tslib_1.__param(4, repository_1.repository.getter('MemberSubscriptionRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.PostgresDataSource, Function, Function, Function, Function])
], MemberRepository);
//# sourceMappingURL=member.repository.js.map