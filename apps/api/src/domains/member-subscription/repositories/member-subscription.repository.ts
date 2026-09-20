import { Getter, inject } from '@loopback/core'
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository'
import { PostgresDataSource } from '../../../datasources'
import { MemberSubscription } from '../models'
import { Member } from '../../member/models'
import { MemberRepository } from '../../member/repositories'
import { MemberPlan } from '../../member-plan/models'
import { MemberPlanRepository } from '../../member-plan/repositories'
import { User } from '../../user/models'
import { UserRepository } from '../../user/repositories'
import { Payment } from '../../payment/models'
import { PaymentRepository } from '../../payment/repositories'
import {
  MemberSubscriptionFilters,
  MemberSubscriptionRelations,
} from '../types'

export class MemberSubscriptionRepository extends DefaultCrudRepository<
  MemberSubscription,
  typeof MemberSubscription.prototype.id,
  MemberSubscriptionRelations
> {
  public readonly member: BelongsToAccessor<
    Member,
    typeof MemberSubscription.prototype.id
  >

  public readonly membershipPlan: BelongsToAccessor<
    MemberPlan,
    typeof MemberSubscription.prototype.id
  >

  public readonly createdBy: BelongsToAccessor<
    User,
    typeof MemberSubscription.prototype.id
  >

  public readonly payments: HasManyRepositoryFactory<
    Payment,
    typeof MemberSubscription.prototype.id
  >

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('MemberRepository')
    protected memberRepositoryGetter: Getter<MemberRepository>,
    @repository.getter('MemberPlanRepository')
    protected memberPlanRepositoryGetter: Getter<MemberPlanRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('PaymentRepository')
    protected paymentRepositoryGetter: Getter<PaymentRepository>,
  ) {
    super(MemberSubscription, dataSource)

    this.member = this.createBelongsToAccessorFor(
      'member',
      memberRepositoryGetter,
    )
    this.registerInclusionResolver('member', this.member.inclusionResolver)

    this.membershipPlan = this.createBelongsToAccessorFor(
      'membershipPlan',
      memberPlanRepositoryGetter,
    )
    this.registerInclusionResolver(
      'membershipPlan',
      this.membershipPlan.inclusionResolver,
    )

    this.createdBy = this.createBelongsToAccessorFor(
      'createdBy',
      userRepositoryGetter,
    )
    this.registerInclusionResolver(
      'createdBy',
      this.createdBy.inclusionResolver,
    )

    this.payments = this.createHasManyRepositoryFactoryFor(
      'payments',
      paymentRepositoryGetter,
    )
    this.registerInclusionResolver('payments', this.payments.inclusionResolver)
  }

  async findIdsForList(filters?: MemberSubscriptionFilters): Promise<number[]> {
    const search = filters?.search?.trim()
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
        OR mp."name" ILIKE $${params.length}
      )
    `)
    }

    if (status !== 'all') {
      params.push(status)

      conditions.push(`
      ms."status" = $${params.length}
    `)
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    const query = `
    SELECT ms."id"
    FROM "membersubscription" ms

    LEFT JOIN "member" m
      ON ms."memberid" = m."id"

    LEFT JOIN "memberplan" mp
      ON ms."membershipplanid" = mp."id"

    ${whereClause}

    ORDER BY mp."price" ASC
  `

    const rows = await this.dataSource.execute(query, params)

    return rows.map((row: { id: number }) => row.id)
  }
}
