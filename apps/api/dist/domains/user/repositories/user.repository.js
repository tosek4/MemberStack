"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../../../datasources");
const models_1 = require("../models");
let UserRepository = class UserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, roleRepositoryGetter, refreshTokenRepositoryGetter, memberRepositoryGetter, paymentRepositoryGetter, attendanceRepositoryGetter) {
        super(models_1.User, dataSource);
        this.roleRepositoryGetter = roleRepositoryGetter;
        this.refreshTokenRepositoryGetter = refreshTokenRepositoryGetter;
        this.memberRepositoryGetter = memberRepositoryGetter;
        this.paymentRepositoryGetter = paymentRepositoryGetter;
        this.attendanceRepositoryGetter = attendanceRepositoryGetter;
        this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
        this.registerInclusionResolver('role', this.role.inclusionResolver);
        this.refreshTokens = this.createHasManyRepositoryFactoryFor('refreshTokens', refreshTokenRepositoryGetter);
        this.registerInclusionResolver('refreshTokens', this.refreshTokens.inclusionResolver);
        this.members = this.createHasManyRepositoryFactoryFor('members', memberRepositoryGetter);
        this.registerInclusionResolver('members', this.members.inclusionResolver);
        this.payments = this.createHasManyRepositoryFactoryFor('payments', paymentRepositoryGetter);
        this.registerInclusionResolver('payments', this.payments.inclusionResolver);
        this.attendances = this.createHasManyRepositoryFactoryFor('attendances', attendanceRepositoryGetter);
        this.registerInclusionResolver('attendances', this.attendances.inclusionResolver);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.postgres')),
    tslib_1.__param(1, repository_1.repository.getter('RoleRepository')),
    tslib_1.__param(2, repository_1.repository.getter('RefreshTokenRepository')),
    tslib_1.__param(3, repository_1.repository.getter('MemberRepository')),
    tslib_1.__param(4, repository_1.repository.getter('PaymentRepository')),
    tslib_1.__param(5, repository_1.repository.getter('AttendanceRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.PostgresDataSource, Function, Function, Function, Function, Function])
], UserRepository);
//# sourceMappingURL=user.repository.js.map