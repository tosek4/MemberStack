import { BindingScope, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { Payment } from '../models'
import { PaymentRepository } from '../repositories'

@injectable({ scope: BindingScope.TRANSIENT })
export class PaymentService {
  constructor(
    @repository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {}

  create(data: Omit<Payment, 'id'>): Promise<Payment> {
    return this.paymentRepository.create(data)
  }

  find(filter?: Filter<Payment>): Promise<Payment[]> {
    return this.paymentRepository.find(filter)
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<Payment>,
  ): Promise<Payment> {
    try {
      return await this.paymentRepository.findById(id, filter)
    } catch {
      throw new HttpErrors.NotFound(`Payment ${id} not found`)
    }
  }

  count(where?: Where<Payment>): Promise<Count> {
    return this.paymentRepository.count(where)
  }

  async updateById(id: number, data: Partial<Payment>): Promise<void> {
    await this.findById(id)
    await this.paymentRepository.updateById(id, data)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.paymentRepository.deleteById(id)
  }
}
