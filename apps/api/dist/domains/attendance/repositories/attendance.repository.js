"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../../../datasources");
const models_1 = require("../models");
let AttendanceRepository = class AttendanceRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, memberRepositoryGetter, userRepositoryGetter) {
        super(models_1.Attendance, dataSource);
        this.memberRepositoryGetter = memberRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.member = this.createBelongsToAccessorFor('member', memberRepositoryGetter);
        this.registerInclusionResolver('member', this.member.inclusionResolver);
        this.createdBy = this.createBelongsToAccessorFor('createdBy', userRepositoryGetter);
        this.registerInclusionResolver('createdBy', this.createdBy.inclusionResolver);
    }
};
exports.AttendanceRepository = AttendanceRepository;
exports.AttendanceRepository = AttendanceRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.postgres')),
    tslib_1.__param(1, repository_1.repository.getter('MemberRepository')),
    tslib_1.__param(2, repository_1.repository.getter('UserRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.PostgresDataSource, Function, Function])
], AttendanceRepository);
//# sourceMappingURL=attendance.repository.js.map