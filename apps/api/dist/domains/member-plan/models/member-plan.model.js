"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberPlan = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../../member-subscription/models");
let MemberPlan = class MemberPlan extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.MemberPlan = MemberPlan;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], MemberPlan.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], MemberPlan.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], MemberPlan.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        defaultFn: 'now',
        required: true,
    }),
    tslib_1.__metadata("design:type", Date
    // relations
    )
], MemberPlan.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_1.MemberSubscription, { keyTo: 'membershipPlanId' }),
    tslib_1.__metadata("design:type", Array)
], MemberPlan.prototype, "subscriptions", void 0);
exports.MemberPlan = MemberPlan = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], MemberPlan);
//# sourceMappingURL=member-plan.model.js.map