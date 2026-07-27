"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../../member/models");
const models_2 = require("../../user/models");
let Attendance = class Attendance extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Attendance = Attendance;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Attendance.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", Date)
], Attendance.prototype, "checkedInAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], Attendance.prototype, "checkedOutAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: ['qr', 'nfc', 'manual'],
        },
    }),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "attendanceMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => models_1.Member),
    tslib_1.__metadata("design:type", Number)
], Attendance.prototype, "memberId", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => models_2.User, { name: 'createdBy' }),
    tslib_1.__metadata("design:type", Number)
], Attendance.prototype, "createdByUserId", void 0);
exports.Attendance = Attendance = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Attendance);
//# sourceMappingURL=attendance.model.js.map