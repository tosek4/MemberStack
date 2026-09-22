import { injectable } from '@loopback/core'
import { inject } from '@loopback/core'

import { PostgresDataSource } from '../../../datasources'

import {
  DashboardAttendanceItem,
  DashboardExpiringMember,
  DashboardMemberActivityItem,
  DashboardOverview,
  DashboardPeriod,
  DashboardRecentPayment,
} from '../types'

@injectable()
export class DashboardService {
  constructor(
    @inject('datasources.postgres')
    private readonly dataSource: PostgresDataSource,
  ) {}

  async getOverview(): Promise<DashboardOverview> {
    const query = `
      SELECT
        (
          SELECT COUNT(*)
          FROM "member"
        ) AS "totalMembers",

        (
          SELECT COUNT(DISTINCT ms."memberid")
          FROM "membersubscription" ms
          WHERE
            ms."startedat" <= NOW()
            AND ms."expiresat" > NOW()
            AND ms."status" = 'active'
        ) AS "activeMembers",

        (
          SELECT COUNT(DISTINCT ms."memberid")
          FROM "membersubscription" ms
          WHERE
            ms."expiresat" > NOW()
            AND ms."expiresat" <= NOW() + INTERVAL '7 days'
            AND ms."status" = 'active'
        ) AS "expiringMembers",

        (
          SELECT COUNT(*)
          FROM "attendance" a
          WHERE
            a."checkedinat" >= CURRENT_DATE
            AND a."checkedinat" < CURRENT_DATE + INTERVAL '1 day'
        ) AS "todayAttendance",

        (
          SELECT COALESCE(SUM(p."amount"), 0)
          FROM "payment" p
          WHERE
            p."paidat" >= CURRENT_DATE
            AND p."paidat" < CURRENT_DATE + INTERVAL '1 day'
            AND p."status" = 'paid'
        ) AS "todayRevenue",

        (
          SELECT COALESCE(SUM(p."amount"), 0)
          FROM "payment" p
          WHERE
            p."paidat" >= DATE_TRUNC('month', CURRENT_DATE)
            AND p."paidat" < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
            AND p."status" = 'paid'
        ) AS "monthlyRevenue"
    `

    const rows = await this.dataSource.execute(query)

    const row = rows[0]

    return {
      totalMembers: Number(row.totalMembers),
      activeMembers: Number(row.activeMembers),
      expiringMembers: Number(row.expiringMembers),
      todayAttendance: Number(row.todayAttendance),
      todayRevenue: Number(row.todayRevenue),
      monthlyRevenue: Number(row.monthlyRevenue),
    }
  }

  async getMembersActivity(
    period: DashboardPeriod = '30d',
  ): Promise<DashboardMemberActivityItem[]> {
    const periodConfig: Record<
      DashboardPeriod,
      {
        start: string
      }
    > = {
      '7d': {
        start: `CURRENT_DATE - INTERVAL '6 days'`,
      },
      '30d': {
        start: `CURRENT_DATE - INTERVAL '29 days'`,
      },
      '3m': {
        start: `CURRENT_DATE - INTERVAL '3 months'`,
      },
      '1y': {
        start: `CURRENT_DATE - INTERVAL '1 year'`,
      },
    }

    const config = periodConfig[period] ?? periodConfig['30d']

    const query = `
    SELECT
      TO_CHAR(day, 'YYYY-MM-DD') AS "date",

      (
        SELECT COUNT(*)
        FROM "member" m
        WHERE
          m."createdat" >= day
          AND m."createdat" < day + INTERVAL '1 day'
      ) AS "newMembers",

      (
        SELECT COUNT(DISTINCT ms."memberid")
        FROM "membersubscription" ms
        WHERE
          ms."startedat" <= day
          AND ms."expiresat" > day
      ) AS "activeMembers",

      (
        SELECT COUNT(DISTINCT ms."memberid")
        FROM "membersubscription" ms
        WHERE
          ms."expiresat" <= day
          AND NOT EXISTS (
            SELECT 1
            FROM "membersubscription" active_ms
            WHERE
              active_ms."memberid" = ms."memberid"
              AND active_ms."startedat" <= day
              AND active_ms."expiresat" > day
          )
      ) AS "expiredMembers"

    FROM generate_series(
      ${config.start},
      CURRENT_DATE,
      INTERVAL '1 day'
    ) AS day

    ORDER BY day ASC
  `

    const rows = await this.dataSource.execute(query)

    return rows.map(
      (row: {
        date: string
        newMembers: number | string
        activeMembers: number | string
        expiredMembers: number | string
      }) => ({
        date: row.date,
        newMembers: Number(row.newMembers),
        activeMembers: Number(row.activeMembers),
        expiredMembers: Number(row.expiredMembers),
      }),
    )
  }
  async getAttendance(month: string): Promise<DashboardAttendanceItem[]> {
    const query = `
    SELECT
      TO_CHAR(day, 'YYYY-MM-DD') AS "date",
      COUNT(a."id") AS "checkIns"
    FROM generate_series(
      TO_DATE($1 || '-01', 'YYYY-MM-DD'),
      TO_DATE($1 || '-01', 'YYYY-MM-DD')
        + INTERVAL '1 month'
        - INTERVAL '1 day',
      INTERVAL '1 day'
    ) AS day
    LEFT JOIN "attendance" a
      ON
        a."checkedinat" >= day
        AND a."checkedinat" < day + INTERVAL '1 day'
    GROUP BY day
    ORDER BY day ASC
  `

    const rows = await this.dataSource.execute(query, [month])

    return rows.map((row: { date: string; checkIns: number | string }) => ({
      date: row.date,
      checkIns: Number(row.checkIns),
    }))
  }

  async getExpiringMembers(): Promise<DashboardExpiringMember[]> {
    const query = `
    SELECT
      m."id" AS "id",
      m."firstname" AS "firstName",
      m."lastname" AS "lastName",
      mp."name" AS "planName",
      GREATEST(
        0,
        CEIL(
          EXTRACT(
            EPOCH FROM (ms."expiresat" - NOW())
          ) / 86400
        )
      )::int AS "daysRemaining"

    FROM "member" m

    INNER JOIN "membersubscription" ms
      ON ms."id" = (
        SELECT ms2."id"
        FROM "membersubscription" ms2
        WHERE ms2."memberid" = m."id"
        ORDER BY
          ms2."startedat" DESC,
          ms2."expiresat" DESC
        LIMIT 1
      )

    INNER JOIN "memberplan" mp
      ON mp."id" = ms."membershipplanid"

    WHERE
      ms."expiresat" > NOW()
      AND ms."expiresat" <= NOW() + INTERVAL '7 days'

    ORDER BY ms."expiresat" ASC
  `

    const rows = await this.dataSource.execute(query)

    return rows.map(
      (row: {
        id: number
        firstName: string
        lastName: string
        planName: string
        daysRemaining: number | string
      }) => ({
        id: Number(row.id),
        firstName: row.firstName,
        lastName: row.lastName,
        planName: row.planName,
        daysRemaining: Number(row.daysRemaining),
      }),
    )
  }

  async getRecentPayments(): Promise<DashboardRecentPayment[]> {
    const query = `
    SELECT
      p."id" AS "id",
      m."id" AS "memberId",
      m."firstname" AS "firstName",
      m."lastname" AS "lastName",
      mp."name" AS "planName",
      p."amount" AS "amount",
      p."paidat" AS "date"
    FROM "payment" p

    INNER JOIN "member" m
      ON m."id" = p."memberid"

    INNER JOIN "membersubscription" ms
      ON ms."id" = p."membersubscriptionid"

    INNER JOIN "memberplan" mp
      ON mp."id" = ms."membershipplanid"

    WHERE p."status" = 'paid'

    ORDER BY p."paidat" DESC

    LIMIT 5
  `

    const rows = await this.dataSource.execute(query)

    return rows.map(
      (row: {
        id: number
        memberId: number

        firstName: string
        lastName: string
        planName: string
        amount: number | string
        date: Date | string
      }) => ({
        id: Number(row.id),
        memberId: Number(row.memberId),
        firstName: row.firstName,
        lastName: row.lastName,
        planName: row.planName,
        amount: Number(row.amount),
        date: new Date(row.date).toISOString(),
      }),
    )
  }
}
