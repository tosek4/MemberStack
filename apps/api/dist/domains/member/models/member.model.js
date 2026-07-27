"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../../user/models");
const models_2 = require("../../attendance/models");
const models_3 = require("../../payment/models");
const models_4 = require("../../member-subscription/models");
const member_status_1 = require("../types/member-status");
let Member = class Member extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Member = Member;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Member.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        index: {
            unique: true,
        },
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "emergency_contact", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "profile_image", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(member_status_1.MemberStatus),
        },
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => models_1.User, { name: 'createdBy' }),
    tslib_1.__metadata("design:type", Number)
], Member.prototype, "createdByUserId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_2.Attendance),
    tslib_1.__metadata("design:type", Array)
], Member.prototype, "attendances", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_3.Payment),
    tslib_1.__metadata("design:type", Array)
], Member.prototype, "payments", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_4.MemberSubscription),
    tslib_1.__metadata("design:type", Array)
], Member.prototype, "subscriptions", void 0);
exports.Member = Member = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Member);
//# sourceMappingURL=member.model.js.map