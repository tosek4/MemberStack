"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../../user/models");
let RefreshToken = class RefreshToken extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.RefreshToken = RefreshToken;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], RefreshToken.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], RefreshToken.prototype, "expiresAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], RefreshToken.prototype, "revokedAt", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => models_1.User),
    tslib_1.__metadata("design:type", Number)
], RefreshToken.prototype, "userId", void 0);
exports.RefreshToken = RefreshToken = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], RefreshToken);
//# sourceMappingURL=refresh-token.model.js.map