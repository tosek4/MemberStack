"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Payment = class Payment extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Payment = Payment;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Payment.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Payment.prototype, "memberSubscriptionId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'enum',
        required: true,
        members: ['cash', 'card', 'bank_transfer', 'paypal', 'other'],
    }),
    tslib_1.__metadata("design:type", String)
], Payment.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'timestamp',
    }),
    tslib_1.__metadata("design:type", String)
], Payment.prototype, "paidAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Payment.prototype, "transactionReference", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Payment.prototype, "createdByUserId", void 0);
exports.Payment = Payment = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Payment);
//# sourceMappingURL=payment.model.js.map