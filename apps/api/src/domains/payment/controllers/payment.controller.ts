import { service } from '@loopback/core'
import { Count,  Where } from '@loopback/repository'
import {
  api,
  del,
  get,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest'
import { Payment } from '../models'
import { PaymentService } from '../service'
import {
  CreatePaymentRequestSchema,
  CreatePaymentResponseSchema,
  PaymentCountResponseSchema,
  PaymentGetByIdResponseSchema,
  PaymentResponseSchema,
  PaymentUpdateResponseSchema,
  UpdatePaymentRequestSchema,
} from './payment.docs'
import {
  PaymentListItem,
  PaymentListMethod,
  PaymentListStatus,
} from '../types'

@api({ basePath: '/payments' })
export class PaymentController {
  constructor(
    @service(PaymentService)
    private paymentService: PaymentService,
  ) {}

  @get('/')
  @response(200, PaymentResponseSchema)
  find(
    @param.query.string('search') search?: string,
    @param.query.string('method') method?: string,
    @param.query.string('status') status?: string,
  ): Promise<PaymentListItem[]> {
    return this.paymentService.find({
      search,
      method: method as PaymentListMethod | undefined,
      status: status as PaymentListStatus | undefined,
    })
  }

  @post('/')
  @response(200, CreatePaymentResponseSchema)
  create(
    @requestBody(CreatePaymentRequestSchema)
    payment: Omit<Payment, 'id'>,
  ): Promise<Payment> {
    return this.paymentService.create(payment)
  }

  @get('/count')
  @response(200, PaymentCountResponseSchema)
  count(@param.where(Payment) where?: Where<Payment>): Promise<Count> {
    return this.paymentService.count(where)
  }

  @get('/{id}')
  @response(200, PaymentGetByIdResponseSchema)
  findById(@param.path.number('id') id: number): Promise<Payment> {
    return this.paymentService.findById(id)
  }

  @patch('/{id}')
  @response(204, PaymentUpdateResponseSchema)
  async updateById(
    @param.path.number('id') id: number,
    @requestBody(UpdatePaymentRequestSchema)
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
