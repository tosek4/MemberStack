import { getModelSchemaRef, SchemaObject } from '@loopback/rest'
import { Payment } from '../models'
import { CountSchema } from '@loopback/repository'

export const PaymentResponseSchema = {
  responses: {
    '200': {
      description: 'Payment model instance',
      content: { 'application/json': { schema: getModelSchemaRef(Payment) } },
    },
  },
}

export const PaymentCountResponseSchema = {
  responses: {
    '200': {
      description: 'Payment model count',
      content: { 'application/json': { schema: CountSchema } },
    },
  },
}

export const PaymentGetByIdResponseSchema = {
  responses: {
    '200': {
      description: 'Payment model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(Payment) },
      },
    },
  },
}

export const PaymentUpdateResponseSchema = {
  responses: {
    '200': {
      description: 'Payment PATCH success',
    },
  },
}

export const CreatePaymentResponseSchema = {
  responses: {
    '200': {
      description: 'Payment model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(Payment) },
      },
    },
  },
}

const createPaymentSchema: SchemaObject = {
  type: 'object',
  required: [],
  properties: {
    amount: { type: 'number' },
    paymentMethod: {
      type: 'string',
      enum: ['cash', 'card', 'bank_transfer', 'paypal', 'other'],
    },
    paidAt: { type: 'string' },
    transactionReference: { type: 'string' },
    memberId: { type: 'number' },
    memberSubscriptionId: { type: 'number' },
    createdByUserId: { type: 'number' },
  },
}

export const CreatePaymentRequestSchema = {
  description: 'Required input for creating a payment',
  content: {
    'application/json': {
      schema: createPaymentSchema,
    },
  },
  required: true,
}

export const UpdatePaymentRequestSchema = {
  description: 'Required input for updating a payment',
  content: {
    'application/json': {
      schema: getModelSchemaRef(Payment, { partial: true }),
    },
  },
  required: true,
}
