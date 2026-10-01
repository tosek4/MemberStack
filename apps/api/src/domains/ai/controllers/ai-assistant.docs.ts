import { SchemaObject } from '@loopback/rest'

const aiAskRequestSchema: SchemaObject = {
  type: 'object',
  required: ['question'],
  properties: {
    question: {
      type: 'string',
      minLength: 1,
      maxLength: 1000,
    },
  },
  additionalProperties: false,
}

const aiAskResponseSchema: SchemaObject = {
  type: 'object',
  required: ['answer'],
  properties: {
    answer: {
      type: 'string',
    },
  },
  additionalProperties: false,
}

export const AIAskRequestSchema = {
  description: 'Ask the MemberStack AI assistant a question',
  required: true,
  content: {
    'application/json': {
      schema: aiAskRequestSchema,
    },
  },
}

export const AIAskResponseSchema = {
  description: 'Answer from the MemberStack AI assistant',
  content: {
    'application/json': {
      schema: aiAskResponseSchema,
    },
  },
}
