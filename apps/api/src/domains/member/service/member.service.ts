import { BindingScope, injectable } from '@loopback/core'
import {
  Count,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { Member } from '../models'
import { MemberRepository } from '../repositories'

@injectable({ scope: BindingScope.TRANSIENT })
export class MemberService {
  constructor(
    @repository(MemberRepository)
    private memberRepository: MemberRepository,
  ) {}

  create(data: Omit<Member, 'id'>): Promise<Member> {
    return this.memberRepository.create(data)
  }

  find(filter?: Filter<Member>): Promise<Member[]> {
    return this.memberRepository.find(filter)
  }

  async findById(
    id: number,
    filter?: FilterExcludingWhere<Member>,
  ): Promise<Member> {
    try {
      return await this.memberRepository.findById(id, filter)
    } catch {
      throw new HttpErrors.NotFound(`Member ${id} not found`)
    }
  }

  count(where?: Where<Member>): Promise<Count> {
    return this.memberRepository.count(where)
  }

  async updateById(id: number, data: Partial<Member>): Promise<void> {
    await this.findById(id)
    await this.memberRepository.updateById(id, data)
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id)
    await this.memberRepository.deleteById(id)
  }
}
