import { SchemaObject } from "@loopback/rest"

export const createUserSchema: SchemaObject = {
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

export const updateUserSchema: SchemaObject = {
  type: 'object',
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
