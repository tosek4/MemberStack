"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberSubscription = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let MemberSubscription = class MemberSubscription extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.MemberSubscription = MemberSubscription;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], MemberSubscription.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], MemberSubscription.prototype, "memberId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], MemberSubscription.prototype, "membershipPlanId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], MemberSubscription.prototype, "startedAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], MemberSubscription.prototype, "expiresAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'enum',
        required: true,
        members: ['active', 'inactive', 'expired', 'suspended', 'blocked'],
    }),
    tslib_1.__metadata("design:type", String)
], MemberSubscription.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], MemberSubscription.prototype, "remainingVisits", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], MemberSubscription.prototype, "createdByUserId", void 0);
exports.MemberSubscription = MemberSubscription = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], MemberSubscription);
//# sourceMappingURL=member-subscription.js.map