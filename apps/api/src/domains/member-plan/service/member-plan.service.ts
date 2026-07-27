import { BindingScope, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { MemberPlan } from '../models'
import { MemberPlanRepository } from '../repositories'

@injectable({ scope: BindingScope.TRANSIENT })
export class MemberPlanService {
  constructor(
    @repository(MemberPlanRepository)
    private memberPlanRepository: MemberPlanRepository,
  ) {}

  create(data: Omit<MemberPlan, 'id'>): Promise<MemberPlan> {
    return this.memberPlanRepository.create(data)
  }

  find(filter?: Filter<MemberPlan>): Promise<MemberPlan[]> {
    return this.memberPlanRepository.find(filter)
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<MemberPlan>,
  ): Promise<MemberPlan> {
    try {
      return await this.memberPlanRepository.findById(id, filter)
    } catch {
      throw new HttpErrors.NotFound(`MemberPlan ${id} not found`)
    }
  }

  count(where?: Where<MemberPlan>): Promise<Count> {
    return this.memberPlanRepository.count(where)
  }

  async updateById(id: number, data: Partial<MemberPlan>): Promise<void> {
    await this.findById(id)
    await this.memberPlanRepository.updateById(id, data)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.memberPlanRepository.deleteById(id)
  }
}
