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
import { MemberListFilters, MemberListItem } from '../types'

@injectable({ scope: BindingScope.TRANSIENT })
export class MemberService {
  constructor(
    @repository(MemberRepository)
    private memberRepository: MemberRepository,
  ) {}

  create(data: Omit<Member, 'id'>): Promise<Member> {
    return this.memberRepository.create(data)
  }
  async getAllMembers(filters?: MemberListFilters): Promise<MemberListItem[]> {
    const memberIds = await this.memberRepository.findIdsForList(filters)

    if (memberIds.length === 0) {
      return []
    }

    const members = await this.memberRepository.find({
      where: {
        id: {
          inq: memberIds,
        },
      },
      include: [
        {
          relation: 'subscriptions',
          scope: {
            order: ['startedAt DESC', 'expiresAt DESC'],
            limit: 1,
            include: ['membershipPlan'],
          },
        },
      ],
    })

    return members.map((member) => {
      const { subscriptions, ...memberData } = member

      return {
        ...memberData,
        latestSubscription: subscriptions?.[0] ?? null,
      }
    })
  }
  async findById(id: number): Promise<MemberListItem> {
    try {
      const member = await this.memberRepository.findById(id, {
        include: [
          {
            relation: 'subscriptions',
            scope: {
              order: ['startedAt DESC', 'expiresAt DESC'],
              limit: 1,
              include: ['membershipPlan'],
            },
          },
        ],
      })
      const { subscriptions, ...memberData } = member
      return {
        latestSubscription: member.subscriptions?.[0] ?? null,
        ...memberData,
      }
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
