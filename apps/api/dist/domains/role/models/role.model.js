"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../../user/models");
let Role = class Role extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Role = Role;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        defaultFn: 'now',
    }),
    tslib_1.__metadata("design:type", Date
    // relations
    )
], Role.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => models_1.User),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "users", void 0);
exports.Role = Role = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Role);
//# sourceMappingURL=role.model.js.map