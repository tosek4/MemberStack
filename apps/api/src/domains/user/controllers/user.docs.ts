import { CountSchema } from '@loopback/repository'
import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { User } from '../models'
import { createUserSchema, updateUserSchema } from '../schemas'

export const UserLogoutResponseSchema = {
  responses: {
    '200': {
      description: 'Revoke the given refresh token',
    },
  },
}

export const CountUserResponseSchema = {
  description: 'User model count',
  content: { 'application/json': { schema: CountSchema } },
}

export const getUserResponseSchema = {
  description: 'Array of User model instances',
  content: {
    'application/json': {
      schema: { type: 'array', items: getModelSchemaRef(User) },
    },
  },
}

export const getUserByIdResponseSchema = {
  description: 'User model instance',
  content: { 'application/json': { schema: getModelSchemaRef(User) } },
}

export const deleteUserByIdResponseSchema = {
  description: 'User DELETE success',
}

export const updateUserByIdResponseSchema = {
  description: 'User PATCH success',
}

export const createUserResponseSchema = {
  description: 'User model instance',
  content: { 'application/json': { schema: getModelSchemaRef(User) } },
}

export const CreateUserRequestBody = {
  description: 'Required input for creating user  ',
  content: { 'application/json': { schema: createUserSchema } },
  required: true,
}
export const UpdateUserRequestBody = {
  description: 'Required input for updating user  ',
  content: { 'application/json': { schema: updateUserSchema } },
  required: true,
}
