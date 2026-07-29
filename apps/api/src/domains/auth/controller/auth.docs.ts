import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { User } from '../../user/models'

const UserLoginSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
}

const registerSchema: SchemaObject = {
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'password', 'roleId'],
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    phone: { type: 'string' },
    isActive: { type: 'boolean' },
    roleId: { type: 'number' },
  },
}

const refreshSchema: SchemaObject = {
  type: 'object',
  required: ['refreshToken'],
  properties: {
    refreshToken: { type: 'string' },
  },
}

export const UserRegisterResponseSchema = {
  responses: {
    '200': {
      description: 'Register a new user',
      content: { 'application/json': { schema: getModelSchemaRef(User) } },
    },
  },
}

export const UserRegisterRequestBody = {
  description: 'Required input for register',
  content: { 'application/json': { schema: registerSchema } },
  required: true,
}

export const UserLoginResponseSchema = {
  responses: {
    '200': {
      description: 'Login and receive access + refresh tokens',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
}
export const UserLogOutResponseSchema = {
  responses: {
    '200': {
      description: 'Revoke the given refresh token',
    },
  },
}

export const UserLoginRequestBody = {
  description: 'Required input for login',
  content: {
    'application/json': {
      schema: UserLoginSchema,
    },
  },
  required: true,
}

export const UserRefreshRequestBody = {
  description: 'Required input for refresh',
  content: {
    'application/json': {
      schema: refreshSchema,
    },
  },
  required: true,
}

export const UserMeResponseSchema = {
  responses: {
    '200': {
      description: 'Current authenticated user',
      content: { 'application/json': { schema: getModelSchemaRef(User) } },
    },
  },
}
