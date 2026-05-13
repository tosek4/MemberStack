const {
  DB_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  DB_PORT,
  SMTP_USERNAME,
  SMTP_SERVER,
  SMTP_PASSWORD,
  SMTP_SENDER,
  SMTP_PORT,
  ADMIN_USERNAME,
} = process.env

export const EConfigKeys = {
  dbName: DB_NAME as string,
  dbHost: DB_HOST as string,
  dbPassword: DB_PASSWORD as string,
  dbUser: DB_USER as string,
  dbPort: Number(DB_PORT),
  smtpHost: SMTP_SERVER as string,
  smtpPort: Number(SMTP_PORT) as number,
  smtpUser: SMTP_USERNAME as string,
  smtpSender: SMTP_SENDER as string,
  smtpPassword: SMTP_PASSWORD as string,
  adminUsername: ADMIN_USERNAME as string,
} as const
