import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { Payment } from '../models'
import { Member } from '../../member/models'
import { MemberRepository } from '../../member/repositories'
import { MemberSubscription } from '../../member-subscription/models'
import { MemberSubscriptionRepository } from '../../member-subscription/repositories'
import { User } from '../../user/models'
import { UserRepository } from '../../user/repositories'
import { PaymentListFilters, PaymentRelations } from '../types'

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.id,
  PaymentRelations
> {
  public readonly member: BelongsToAccessor<Member, typeof Payment.prototype.id>

  public readonly memberSubscription: BelongsToAccessor<
    MemberSubscription,
    typeof Payment.prototype.id
  >

  public readonly createdBy: BelongsToAccessor<
    User,
    typeof Payment.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('MemberRepository')
    protected memberRepositoryGetter: Getter<MemberRepository>,
    @repository.getter('MemberSubscriptionRepository')
    protected memberSubscriptionRepositoryGetter: Getter<MemberSubscriptionRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Payment, dataSource)

    this.member = this.createBelongsToAccessorFor(
      'member',
      memberRepositoryGetter,
    )
    this.registerInclusionResolver('member', this.member.inclusionResolver)

    this.memberSubscription = this.createBelongsToAccessorFor(
      'memberSubscription',
      memberSubscriptionRepositoryGetter,
    )
    this.registerInclusionResolver(
      'memberSubscription',
      this.memberSubscription.inclusionResolver,
    )

    this.createdBy = this.createBelongsToAccessorFor(
      'createdBy',
      userRepositoryGetter,
    )
    this.registerInclusionResolver(
      'createdBy',
      this.createdBy.inclusionResolver,
    )
  }

  async findIdsForList(filters?: PaymentListFilters): Promise<number[]> {
    const search = filters?.search?.trim()
    const method = filters?.method ?? 'all'
    const status = filters?.status ?? 'all'

    const params: unknown[] = []
    const conditions: string[] = []

    if (search) {
      params.push(`%${search}%`)

      conditions.push(`
      (
        m."firstname" ILIKE $${params.length}
        OR m."lastname" ILIKE $${params.length}
        OR m."email" ILIKE $${params.length}
      )
    `)
    }

    if (method !== 'all') {
      const dbMethod = method === 'bank_transfer' ? 'bank_transfer' : method

      params.push(dbMethod)

      conditions.push(`
      p."paymentmethod" = $${params.length}
    `)
    }

    if (status !== 'all') {
      params.push(status)

      conditions.push(`
      p."status" = $${params.length}
    `)
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    const query = `
    SELECT p."id"
    FROM "payment" p

    LEFT JOIN "member" m
      ON p."memberid" = m."id"

    ${whereClause}

    ORDER BY p."paidat" DESC
  `

    const rows = await this.dataSource.execute(query, params)

    return rows.map((row: { id: number }) => row.id)
  }
}
