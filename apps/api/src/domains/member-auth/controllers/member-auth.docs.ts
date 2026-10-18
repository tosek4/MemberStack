import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { Member } from '../../member/models'

const createMemberCodeSchema: SchemaObject = {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
  },
}

export const CreateMemberCodeRequestSchema = {
  description: 'Member email address',
  content: {
    'application/json': {
      schema: createMemberCodeSchema,
    },
  },
  required: true,
}

const verifyCodeBodySchema: SchemaObject = {
  type: 'object',
  required: ['email', 'code'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    code: {
      type: 'string',
      pattern: '^[0-9]{6}$',
    },
  },
}

export const VerifyCodeBodyRequestSchema = {
  description: 'Verify a member verification code',
  content: {
    'application/json': {
      schema: verifyCodeBodySchema,
    },
  },
  required: true,
}
//
const refreshSchema: SchemaObject = {
  type: 'object',
  required: ['refreshToken'],
  properties: {
    refreshToken: {
      type: 'string',
      minLength: 1,
    },
  },
}

export const RefreshRequestSchema = {
  description: 'Rotate a member refresh token',
  content: {
    'application/json': {
      schema: refreshSchema,
    },
  },
  required: true,
}

export const MeResponseSchema = {
  responses: {
    '200': {
      description: 'Current authenticated user',
      content: { 'application/json': { schema: getModelSchemaRef(Member) } },
    },
  },
}

export const MyQrCodeResponseSchema = {
  responses: {
    '200': {
      description: 'Active QR code content of the logged-in member',
      content: {
        'application/json': {
          schema: { type: 'object', properties: { token: { type: 'string' } } },
        },
      },
    },
  },
}
