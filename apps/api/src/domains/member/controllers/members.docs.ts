import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { Member } from '../models'
import { CountSchema } from '@loopback/repository'
import { MemberStatus } from '../types/member-status'

export const MemberResponseSchema = {
  responses: {
    '200': {
      description: 'Array of Member model instances',
      content: {
        'application/json': {
          schema: { type: 'array', items: getModelSchemaRef(Member) },
        },
      },
    },
  },
}

export const MembersCountResponseSchema = {
  responses: {
    '200': {
      description: 'Member model count',
      content: { 'application/json': { schema: CountSchema } },
    },
  },
}

export const MemberGetByIdResponseSchema = {
  responses: {
    '200': {
      description: 'Member model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(Member) },
      },
    },
  },
}

export const MemberUpdateResponseSchema = {
  responses: {
    '200': {
      description: 'Member PATCH success',
    },
  },
}

export const CreateMemberResponseSchema = {
  responses: {
    '200': {
      description: 'Member model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(Member) },
      },
    },
  },
}

const createMemberSchema: SchemaObject = {
  type: 'object',
  required: [
    'firstName',
    'lastName',
    'email',
    'phone',
    'birthDate',
    'gender',
    'status',
  ],
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    birthDate: {
      type: 'string',
    },
    gender: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: Object.values(MemberStatus),
    },
  },
}

export const CreateMemberRequestSchema = {
  description: 'Required input for creating a member',
  content: {
    'application/json': {
      schema: createMemberSchema,
    },
  },
  required: true,
}

export const UpdateMemberRequestSchema = {
  description: 'Required input for updating a member',
  content: {
    'application/json': {
      schema: getModelSchemaRef(Member, { partial: true }),
    },
  },
  required: true,
}
