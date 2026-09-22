import { api, get, param } from '@loopback/rest'
import { inject } from '@loopback/core'

import { DASHBOARD_SERVICE } from '../keys'
import { DashboardService } from '../services/dashboard.service'
import {
  DashboardAttendanceItem,
  DashboardExpiringMember,
  DashboardMemberActivityItem,
  DashboardOverview,
  DashboardPeriod,
  DashboardRecentPayment,
} from '../types/index'

@api({ basePath: '/dashboard' })
export class DashboardController {
  constructor(
    @inject(DASHBOARD_SERVICE)
    private readonly dashboardService: DashboardService,
  ) {}

  @get('/overview')
  async getOverview(): Promise<DashboardOverview> {
    return this.dashboardService.getOverview()
  }

  @get('/membersActivity')
  async getMembersActivity(
    @param.query.string('period') period: DashboardPeriod = '30d',
  ): Promise<DashboardMemberActivityItem[]> {
    return this.dashboardService.getMembersActivity(period)
  }

  @get('/attendance')
  async getAttendance(
    @param.query.string('month') month: string,
  ): Promise<DashboardAttendanceItem[]> {
    return this.dashboardService.getAttendance(month)
  }

  @get('/expiringMembers')
  async getExpiringMembers(): Promise<DashboardExpiringMember[]> {
    return this.dashboardService.getExpiringMembers()
  }

  @get('/recentPayments')
  async getRecentPayments(): Promise<DashboardRecentPayment[]> {
    return this.dashboardService.getRecentPayments()
  }
}
