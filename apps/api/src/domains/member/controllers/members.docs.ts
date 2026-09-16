import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { Member } from '../models'

export const UserMeResponseSchema = {
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
