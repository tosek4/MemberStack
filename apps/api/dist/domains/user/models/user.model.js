"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../../role/models");
const models_2 = require("../../refresh-token/models");
const models_3 = require("../../member/models");
const models_4 = require("../../payment/models");
const models_5 = require("../../attendance/models");
let User = class User extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.User = User;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        index: {
            unique: true,
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        defaultFn: 'now',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => models_1.Role),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_2.RefreshToken),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "refreshTokens", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_3.Member, { keyTo: 'createdByUserId' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "members", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_4.Payment, { keyTo: 'createdByUserId' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "payments", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_5.Attendance, { keyTo: 'createdByUserId' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "attendances", void 0);
exports.User = User = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
//# sourceMappingURL=user.model.js.map