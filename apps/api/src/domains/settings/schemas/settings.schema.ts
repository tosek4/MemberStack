import { SchemaObject } from '@loopback/rest'

const generalSettingsSchema: SchemaObject = {
  type: 'object',
  required: ['gymName', 'email', 'phone', 'address', 'currency'],
  additionalProperties: false,
  properties: {
    gymName: { type: 'string', minLength: 1, maxLength: 150 },
    email: { type: 'string', format: 'email', maxLength: 254 },
    phone: { type: 'string', minLength: 1, maxLength: 50 },
    address: { type: 'string', minLength: 1, maxLength: 250 },
    currency: { type: 'string', enum: ['EUR', 'USD', 'GBP', 'MKD'] },
  },
}

const membershipSettingsSchema: SchemaObject = {
  type: 'object',
  required: ['defaultDuration', 'expiringSoonDays', 'gracePeriodDays'],
  additionalProperties: false,
  properties: {
    defaultDuration: { type: 'integer', minimum: 1, maximum: 36 },
    expiringSoonDays: { type: 'integer', minimum: 0, maximum: 365 },
    gracePeriodDays: { type: 'integer', minimum: 0, maximum: 365 },
  },
}

const securitySettingsSchema: SchemaObject = {
  type: 'object',
  required: ['sessionTimeout'],
  additionalProperties: false,
  properties: {
    sessionTimeout: { type: 'integer', minimum: 5, maximum: 1440 },
  },
}

export const SettingsDataSchema: SchemaObject = {
  type: 'object',
  required: ['general', 'membership', 'security'],
  additionalProperties: false,
  properties: {
    general: generalSettingsSchema,
    membership: membershipSettingsSchema,
    security: securitySettingsSchema,
  },
}

export const UpdateSettingsRequestSchema = {
  description: 'Complete settings configuration to save',
  required: true,
  content: {
    'application/json': { schema: SettingsDataSchema },
  },
}
