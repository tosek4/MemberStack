"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EConfigKeys = void 0;
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT, SMTP_USERNAME, SMTP_SERVER, SMTP_PASSWORD, SMTP_SENDER, SMTP_PORT, ADMIN_USERNAME, } = process.env;
exports.EConfigKeys = {
    dbName: DB_NAME,
    dbHost: DB_HOST,
    dbPassword: DB_PASSWORD,
    dbUser: DB_USER,
    dbPort: DB_PORT,
    smtpHost: SMTP_SERVER,
    smtpPort: Number(SMTP_PORT),
    smtpUser: SMTP_USERNAME,
    smtpSender: SMTP_SENDER,
    smtpPassword: SMTP_PASSWORD,
    adminUsername: ADMIN_USERNAME,
};
//# sourceMappingURL=config.js.map