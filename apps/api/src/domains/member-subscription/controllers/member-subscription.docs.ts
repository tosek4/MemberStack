import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { MemberSubscription } from '../models'
import { CountSchema } from '@loopback/repository'

export const MemberSubscriptionsResponseSchema = {
  responses: {
    '200': {
      description: 'Array of MemberSubscription model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(MemberSubscription),
          },
        },
      },
    },
  },
}

export const MemberSubscriptionCountResponseSchema = {
  responses: {
    '200': {
      description: 'MemberSubscription model count',
      content: { 'application/json': { schema: CountSchema } },
    },
  },
}

export const MemberSubscriptionGetByIdResponseSchema = {
  responses: {
    '200': {
      description: 'MemberSubscription model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(MemberSubscription) },
      },
    },
  },
}

export const MemberSubscriptionUpdateResponseSchema = {
  responses: {
    '200': {
      description: 'MemberSubscription PATCH success',
    },
  },
}

export const CreateMemberSubscriptionResponseSchema = {
  responses: {
    '200': {
      description: 'MemberSubscription model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(MemberSubscription) },
      },
    },
  },
}

const createMemberSubscriptionSchema: SchemaObject = {
  type: 'object',
  required: ['memberId', 'membershipPlanId', 'startedAt'],
  properties: {
    memberId: {
      type: 'number',
    },
    membershipPlanId: {
      type: 'number',
    },
    startedAt: {
      type: 'string',
      format: 'date-time',
    },
    expiresAt: {
      type: 'string',
      format: 'date-time',
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive', 'expired', 'suspended', 'blocked'],
    },

    createdByUserId: {
      type: 'number',
    },
  },
}

export const CreateMemberSubscriptionRequestSchema = {
  description: 'Required input for creating a member subscription',
  content: {
    'application/json': {
      schema: createMemberSubscriptionSchema,
    },
  },
  required: true,
}

export const UpdateMemberSubscriptionRequestSchema = {
  description: 'Required input for updating a member',
  content: {
    'application/json': {
      schema: getModelSchemaRef(MemberSubscription, { partial: true }),
    },
  },
  required: true,
}
