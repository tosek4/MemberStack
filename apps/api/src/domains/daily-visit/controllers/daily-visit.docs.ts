import { SchemaObject } from '@loopback/rest'

const createDailyVisitSchema: SchemaObject = {
  type: 'object',
  required: ['firstName', 'lastName', 'membershipPlanId', 'paymentMethod'],
  properties: {
    firstName: {
      type: 'string',
    },

    lastName: {
      type: 'string',
    },

    phone: {
      type: 'string',
    },

    membershipPlanId: {
      type: 'number',
    },

    paymentMethod: {
      type: 'string',
      enum: ['cash', 'card', 'bank_transfer', 'paypal', 'other'],
    },
  },
}

export const CreateDailyVisitRequestSchema = {
  description: 'Required input for creating a daily visit',
  content: {
    'application/json': {
      schema: createDailyVisitSchema,
    },
  },
  required: true,
}
