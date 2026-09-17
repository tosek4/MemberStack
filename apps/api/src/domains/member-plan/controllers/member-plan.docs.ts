import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { MemberPlan } from '../models'
import { MemberPlanStatus } from '../types'
import { CountSchema } from '@loopback/repository/dist/common-types'

export const MemberPlanResponseSchema = {
  responses: {
    '200': {
      description: 'Array of MemberPlan model instances',
      content: {
        'application/json': {
          schema: { type: 'array', items: getModelSchemaRef(MemberPlan) },
        },
      },
    },
  },
}

export const MemberPlanCountResponseSchema = {
  responses: {
    '200': {
      description: 'MemberPlan model count',
      content: { 'application/json': { schema: CountSchema } },
    },
  },
}

export const MemberPlanGetByIdResponseSchema = {
  responses: {
    '200': {
      description: 'MemberPlan model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(MemberPlan) },
      },
    },
  },
}

export const MemberPlanUpdateResponseSchema = {
  responses: {
    '200': {
      description: 'MemberPlan PATCH success',
    },
  },
}

export const CreateMemberPlanResponseSchema = {
  responses: {
    '200': {
      description: 'MemberPlan model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(MemberPlan) },
      },
    },
  },
}

const createMemberPlanSchema: SchemaObject = {
  type: 'object',
  required: ['name', 'price', 'duration', 'status'],
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    price: {
      type: 'number',
      minimum: 0,
    },
    duration: {
      type: 'number',
      minimum: 1,
    },
    status: {
      type: 'string',
      enum: Object.values(MemberPlanStatus),
    },
  },
}

export const CreateMemberPlanRequestSchema = {
  description: 'Required input for creating a membership plan',
  content: {
    'application/json': {
      schema: createMemberPlanSchema,
    },
  },
  required: true,
}

export const UpdateMemberPlanRequestSchema = {
  description: 'Required input for updating a membership plan',
  content: {
    'application/json': {
      schema: getModelSchemaRef(MemberPlan, { partial: true }),
    },
  },
  required: true,
}
