import { service } from '@loopback/core'
import { Count, CountSchema, Filter, Where } from '@loopback/repository'
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { Payment } from '../models'
import { PaymentService } from '../service'

export class PaymentController {
  constructor(
    @service(PaymentService)
    private paymentService: PaymentService,
  ) {}

  @post('/payments')
  @response(200, {
    description: 'Payment model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Payment) } },
  })
  create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
            exclude: ['id'],
          }),
        },
      },
    })
    payment: Omit<Payment, 'id'>,
  ): Promise<Payment> {
    return this.paymentService.create(payment)
  }

  @get('/payments/count')
  @response(200, {
    description: 'Payment model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  count(@param.where(Payment) where?: Where<Payment>): Promise<Count> {
    return this.paymentService.count(where)
  }

  @get('/payments')
  @response(200, {
    description: 'Array of Payment model instances',
    content: {
      'application/json': {
        schema: { type: 'array', items: getModelSchemaRef(Payment) },
      },
    },
  })
  find(@param.filter(Payment) filter?: Filter<Payment>): Promise<Payment[]> {
    return this.paymentService.find(filter)
  }

  @get('/payments/{id}')
  @response(200, {
    description: 'Payment model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Payment) } },
  })
  findById(@param.path.number('id') id: number): Promise<Payment> {
    return this.paymentService.findById(id)
  }

  @patch('/payments/{id}')
  @response(204, { description: 'Payment PATCH success' })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, { partial: true }),
        },
      },
    })
    payment: Partial<Payment>,
  ): Promise<void> {
    await this.paymentService.updateById(id, payment)
  }

  @del('/payments/{id}')
  @response(204, { description: 'Payment DELETE success' })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.paymentService.deleteById(id)
  }
}
